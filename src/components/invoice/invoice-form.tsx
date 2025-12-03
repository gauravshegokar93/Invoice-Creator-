
'use client';

import { useFormContext } from 'react-hook-form';
import type { Invoice } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { LineItemsForm } from './line-items-form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function InvoiceForm() {
  const { control, watch } = useFormContext<Invoice>();

  const applyTax = watch('totals.applyTax');

  return (
    <div className="space-y-6">
      <Accordion
        type="multiple"
        defaultValue={['item-1', 'item-2', 'item-3']}
        className="w-full"
      >
        {/* FREELANCER DETAILS */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-headline text-lg">
            Your Details (Freelancer)
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={control}
                  name="freelancer.name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mb-4">
                      <FormLabel>Your Name/Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., CodeCraft Freelance Studio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., +91 98765 43210"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.addressLine1"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mb-4">
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Innovation Drive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.city"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Techville" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.state"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Creativania" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.pincode"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 54321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.website"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://your-site.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* CLIENT DETAILS */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-headline text-lg">
            Client Details (Bill To)
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={control}
                  name="client.organizationName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mb-4">
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., BrightWave Digital"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Jane Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., +1 555 123 4567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.addressLine"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 456 Market Street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.city"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Metropolis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.pincode"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* INVOICE DETAILS */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-headline text-lg">
            Invoice Details
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={control}
                  name="invoiceMeta.invoiceNumber"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., INV-2025-010"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="invoiceMeta.currencySymbol"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Currency Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹, $, €" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="invoiceMeta.invoiceDate"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Invoice Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="invoiceMeta.dueDate"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Due Date (Optional)</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* LINE ITEMS */}
      <div>
        <h2 className="font-headline text-lg mb-2">Line Items</h2>
        <LineItemsForm />
      </div>

      {/* TOTALS & TAX */}
      <div>
        <h2 className="font-headline text-lg mb-2">Totals & Tax</h2>
        <Card>
          <CardContent className="pt-6 grid grid-cols-2 gap-x-4">
            <FormField
              control={control}
              name="totals.discount"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 100"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div />
            <div className="flex items-center space-x-2 mb-4 col-span-2">
              <FormField
                control={control}
                name="totals.applyTax"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        id="apply-tax"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="apply-tax" className="cursor-pointer">
                      Apply Tax
                    </Label>
                  </FormItem>
                )}
              />
            </div>
            {applyTax && (
              <>
                <FormField
                  control={control}
                  name="totals.taxLabel"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Tax Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., GST, VAT"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="totals.taxRate"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Tax Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 18"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* PAYMENT DETAILS / TERMS */}
      <Accordion
        type="multiple"
        defaultValue={['payment-terms']}
        className="w-full"
      >
        <AccordionItem value="payment-terms">
          <AccordionTrigger className="font-headline text-lg">
            Payment Details
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={control}
                  name="paymentTerms.termsText"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mb-4">
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Net 30, 50% advance, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bankDetails.bankName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Global Citizen Bank"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bankDetails.accountNumber"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bankDetails.ifsc"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>IFSC / SWIFT Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., GCBIN0012345"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bankDetails.upiId"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>UPI ID (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., your-upi@okbank"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* NOTES & TERMS */}
        <AccordionItem value="notes-terms">
          <AccordionTrigger className="font-headline text-lg">
            Additional Notes & Terms
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 grid grid-cols-1 gap-x-4">
                <FormField
                  control={control}
                  name="projectTimeline"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Project Timeline (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Phase 1: 2 weeks, Phase 2: 3 weeks..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="extraTerms"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Terms & Conditions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Two rounds of revisions are included..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="footerNote"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Footer Note (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Thank you for your business!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

    