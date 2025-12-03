// src/ai/flows/invoice-line-item-suggestions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting common rates for invoice line items.
 *
 * - getInvoiceLineItemSuggestions - A function that suggests common rates for invoice line items based on a description.
 * - InvoiceLineItemSuggestionsInput - The input type for the getInvoiceLineItemSuggestions function.
 * - InvoiceLineItemSuggestionsOutput - The return type for the getInvoiceLineItemSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceLineItemSuggestionsInputSchema = z.object({
  description: z.string().describe('The description of the invoice line item.'),
});
export type InvoiceLineItemSuggestionsInput = z.infer<
  typeof InvoiceLineItemSuggestionsInputSchema
>;

const InvoiceLineItemSuggestionsOutputSchema = z.object({
  suggestedRates: z
    .array(z.number())
    .describe('An array of suggested rates for the invoice line item.'),
});
export type InvoiceLineItemSuggestionsOutput = z.infer<
  typeof InvoiceLineItemSuggestionsOutputSchema
>;

export async function getInvoiceLineItemSuggestions(
  input: InvoiceLineItemSuggestionsInput
): Promise<InvoiceLineItemSuggestionsOutput> {
  return invoiceLineItemSuggestionsFlow(input);
}

const invoiceLineItemSuggestionsPrompt = ai.definePrompt({
  name: 'invoiceLineItemSuggestionsPrompt',
  input: {schema: InvoiceLineItemSuggestionsInputSchema},
  output: {schema: InvoiceLineItemSuggestionsOutputSchema},
  prompt: `You are an expert pricing consultant for freelancers.

You will be provided a description of an invoice line item, and you will suggest common rates for that line item.

Description: {{{description}}}

Suggest 3 common rates for this line item. Return the rates as a JSON array of numbers.

For example:
{
  "suggestedRates": [50, 75, 100]
}
`,
});

const invoiceLineItemSuggestionsFlow = ai.defineFlow(
  {
    name: 'invoiceLineItemSuggestionsFlow',
    inputSchema: InvoiceLineItemSuggestionsInputSchema,
    outputSchema: InvoiceLineItemSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await invoiceLineItemSuggestionsPrompt(input);
    return output!;
  }
);
