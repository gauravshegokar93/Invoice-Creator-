'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import type { Invoice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { Loader2, PlusCircle, Sparkles, Trash2 } from 'lucide-react';
import { getInvoiceLineItemSuggestions } from '@/ai/flows/invoice-line-item-suggestions';

type LineItemsFormProps = {
  form: UseFormReturn<Invoice>;
};

export function LineItemsForm({ form }: LineItemsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lineItems',
  });
  const [suggestions, setSuggestions] = useState<number[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState<number | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleGetSuggestions = async (index: number) => {
    const description = form.getValues(`lineItems.${index}.description`);
    if (!description) return;
    setLoadingSuggestions(true);
    setSuggestionIndex(index);
    try {
      const result = await getInvoiceLineItemSuggestions({ description });
      setSuggestions(result.suggestedRates || []);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const applySuggestion = (rate: number, index: number) => {
    form.setValue(`lineItems.${index}.rate`, rate, { shouldValidate: true });
    setSuggestions([]);
    setSuggestionIndex(null);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name={`lineItems.${index}.description`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Input placeholder="e.g., Custom Landing Page" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`lineItems.${index}.details`} render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Details (Optional)</FormLabel><FormControl><Textarea placeholder="- Detail 1&#10;- Detail 2" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`lineItems.${index}.quantity`} render={({ field }) => ( <FormItem><FormLabel>Quantity</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormItem>
                  <FormLabel>Rate</FormLabel>
                   <Popover open={suggestionIndex === index && suggestions.length > 0} onOpenChange={() => setSuggestionIndex(null)}>
                    <PopoverAnchor>
                      <div className="relative">
                        <FormControl>
                          <Input type="number" placeholder="25000" {...form.register(`lineItems.${index}.rate`)} />
                        </FormControl>
                        <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-accent" onClick={() => handleGetSuggestions(index)} disabled={loadingSuggestions}>
                          {loadingSuggestions ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                          <span className="sr-only">Get AI Suggestions</span>
                        </Button>
                      </div>
                    </PopoverAnchor>
                     <PopoverContent className="w-auto p-2">
                       <p className="text-sm font-medium text-muted-foreground p-2">AI Rate Suggestions</p>
                       <div className="flex gap-2 flex-wrap">
                         {suggestions.map(rate => (
                           <Button key={rate} variant="outline" size="sm" onClick={() => applySuggestion(rate, index)}>{form.getValues('invoiceMeta.currencySymbol')} {rate}</Button>
                         ))}
                       </div>
                     </PopoverContent>
                   </Popover>
                   <FormMessage>{form.formState.errors.lineItems?.[index]?.rate?.message}</FormMessage>
                </FormItem>
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="absolute -top-3 -right-3 h-7 w-7 rounded-full p-0"><Trash2 className="h-4 w-4" /><span className="sr-only">Remove Item</span></Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ description: '', quantity: 1, rate: 0, details: '' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Line Item
        </Button>
      </CardContent>
    </Card>
  );
}
