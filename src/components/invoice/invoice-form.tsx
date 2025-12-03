
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent } from 'react';

const currencies = [
  { value: '₹', label: 'INR (₹)' },
  { value: '$', label: 'USD ($)' },
  { value: '€', label: 'EUR (€)' },
  { value: '£', label: 'GBP (£)' },
  { value: '¥', label: 'JPY (¥)' },
];

export function InvoiceForm() {
  const { control, watch, setValue } = useFormContext<Invoice>();

  const applyTax = watch('totals.applyTax');

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('freelancer.logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


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
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <FormField
                  control={control}
                  name="freelancer.name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Your Name/Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name/Company Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem className="md:col-span-2">
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleLogoUpload} className="pt-2 text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormField
                  control={control}
                  name="freelancer.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
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
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
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
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Address Line 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="Pincode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="freelancer.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website (Optional)"
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
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <FormField
                  control={control}
                  name="client.organizationName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Organization Name"
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
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contact Person"
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
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
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
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address"
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
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="client.pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="Pincode" {...field} />
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
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <FormField
                  control={control}
                  name="invoiceMeta.invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Invoice Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name="invoiceMeta.poNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PO Number (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="PO Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="invoiceMeta.invoiceDate"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
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
                <div className="md:col-span-2 grid grid-cols-2 gap-x-4">
                  <FormField
                    control={control}
                    name="invoiceMeta.currencySymbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map(c => (
                              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <FormItem>
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Discount Amount"
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
            <div className="flex items-center space-x-2 col-span-2">
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
                    <FormItem>
                      <FormLabel>Tax Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tax Label"
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
                    <FormItem>
                      <FormLabel>Tax Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Tax Rate (%)"
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
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <FormField
                  control={control}
                  name="paymentTerms.termsText"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Payment Terms"
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
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank Name"
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
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Account Number"
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
                    <FormItem>
                      <FormLabel>IFSC / SWIFT Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="IFSC / SWIFT Code"
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
                    <FormItem>
                      <FormLabel>UPI ID (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="UPI ID (Optional)"
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
              <CardContent className="pt-6 grid grid-cols-1 gap-x-4 gap-y-4">
                <FormField
                  control={control}
                  name="projectTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Timeline (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Project Timeline (Optional)"
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
                    <FormItem>
                      <FormLabel>Terms & Conditions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Terms & Conditions (Optional)"
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
                    <FormItem>
                      <FormLabel>Footer Note (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Footer Note (Optional)"
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
