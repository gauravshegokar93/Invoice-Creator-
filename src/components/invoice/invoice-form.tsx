
'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { Invoice } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { LineItemsForm } from './line-items-form';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

type InvoiceFormProps = {
  form: UseFormReturn<Invoice>;
};

export function InvoiceForm({ form }: InvoiceFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-6">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-headline text-lg">Your Details (Freelancer)</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="freelancer.name" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Your Name/Company Name</FormLabel>
                      <FormControl><Input placeholder="e.g., CodeCraft Freelance Studio" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="freelancer.email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="e.g., your.email@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="freelancer.phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input placeholder="e.g., +91 98765 43210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="freelancer.addressLine1" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl><Input placeholder="e.g., Baner" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="freelancer.city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., Pune" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="freelancer.state" render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="freelancer.pincode" render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="e.g., 411045" {...field} /></FormControl><FormMessage /></FormMessage></FormItem>)} />
                  <FormField control={form.control} name="freelancer.website" render={({ field }) => ( <FormItem><FormLabel>Website (Optional)</FormLabel><FormControl><Input placeholder="e.g., https://your-site.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-headline text-lg">Client Details (Bill To)</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="client.organizationName" render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Organization Name</FormLabel><FormControl><Input placeholder="e.g., BrightWave Digital" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="client.name" render={({ field }) => ( <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input placeholder="e.g., Marketing Manager" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="client.phone" render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="e.g., +91 90000 11122" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="client.addressLine" render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input placeholder="e.g., Hinjawadi Phase 2" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="client.city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., Pune" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="client.pincode" render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="e.g., 411057" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-headline text-lg">Invoice Details</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="invoiceMeta.invoiceNumber" render={({ field }) => ( <FormItem><FormLabel>Invoice Number</FormLabel><FormControl><Input placeholder="e.g., INV-2025-010" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="invoiceMeta.currencySymbol" render={({ field }) => ( <FormItem><FormLabel>Currency Symbol</FormLabel><FormControl><Input placeholder="e.g., ₹, $" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="invoiceMeta.invoiceDate" render={({ field }) => ( <FormItem><FormLabel>Invoice Date</FormLabel><FormControl><DatePicker date={field.value} setDate={field.onChange} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="invoiceMeta.dueDate" render={({ field }) => ( <FormItem><FormLabel>Due Date (Optional)</FormLabel><FormControl><DatePicker date={field.value} setDate={field.onChange} /></FormControl><FormMessage /></FormItem> )} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div>
          <h2 className="font-headline text-lg mb-2">Line Items</h2>
          <LineItemsForm form={form} />
        </div>
        
        <div>
          <h2 className="font-headline text-lg mb-2">Totals & Tax</h2>
           <Card>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              <FormField control={form.control} name="totals.discount" render={({ field }) => ( <FormItem><FormLabel>Discount Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                <div />
              <div className="flex items-center space-x-2">
                <FormField control={form.control} name="totals.applyTax" render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                        <FormControl>
                            <Switch id="apply-tax" checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <Label htmlFor="apply-tax" className="cursor-pointer">Apply Tax</Label>
                    </FormItem>
                )} />
              </div>
              <div/>
              {form.watch('totals.applyTax') && (
                <>
                  <FormField control={form.control} name="totals.taxLabel" render={({ field }) => ( <FormItem><FormLabel>Tax Label</FormLabel><FormControl><Input placeholder="e.g., GST @ 18%" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="totals.taxRate" render={({ field }) => ( <FormItem><FormLabel>Tax Rate (%)</FormLabel><FormControl><Input type="number" placeholder="e.g., 18" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Accordion type="multiple" defaultValue={['payment-terms']} className="w-full">
          <AccordionItem value="payment-terms">
            <AccordionTrigger className="font-headline text-lg">Payment Details</AccordionTrigger>
            <AccordionContent>
               <Card>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="paymentTerms.termsText" render={({ field }) => ( <FormItem className="md:col-span-2"><FormLabel>Payment Terms</FormLabel><FormControl><Textarea placeholder="e.g., 50% advance..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="bankDetails.bankName" render={({ field }) => ( <FormItem><FormLabel>Bank Name</FormLabel><FormControl><Input placeholder="e.g., HDFC Bank" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="bankDetails.accountNumber" render={({ field }) => ( <FormItem><FormLabel>Account Number</FormLabel><FormControl><Input placeholder="e.g., 501002XXXXXX" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="bankDetails.ifsc" render={({ field }) => ( <FormItem><FormLabel>IFSC Code</FormLabel><FormControl><Input placeholder="e.g., HDFC0001234" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="bankDetails.upiId" render={({ field }) => ( <FormItem><FormLabel>UPI ID (Optional)</FormLabel><FormControl><Input placeholder="e.g., your-upi@okhdfc" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notes-terms">
            <AccordionTrigger className="font-headline text-lg">Additional Notes & Terms</AccordionTrigger>
            <AccordionContent>
               <Card>
                <CardContent className="pt-6 grid grid-cols-1 gap-4">
                  <FormField control={form.control} name="projectTimeline" render={({ field }) => ( <FormItem><FormLabel>Project Timeline (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., Design: 2-3 Days..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="extraTerms" render={({ field }) => ( <FormItem><FormLabel>Terms & Conditions (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., Two rounds of revisions included..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="footerNote" render={({ field }) => ( <FormItem><FormLabel>Footer Note (Optional)</FormLabel><FormControl><Input placeholder="e.g., Thank you for your business!" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
