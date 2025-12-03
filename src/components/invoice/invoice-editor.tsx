
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Invoice } from '@/lib/types';
import { InvoiceSchema, defaultInvoice } from '@/lib/types';
import { InvoiceForm } from './invoice-form';
import { InvoicePreview } from './invoice-preview';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveInvoice } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Form } from '@/components/ui/form';

type InvoiceEditorProps = {
  initialData: Invoice;
};

export function InvoiceEditor({ initialData }: InvoiceEditorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: initialData || defaultInvoice,
    mode: 'onBlur',
  });

  const watchedValues = form.watch();

  const calculatedTotals = useMemo(() => {
    const subtotal = watchedValues.lineItems.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.rate || 0),
      0
    );
    const discount = watchedValues.totals.discount || 0;
    const subtotalAfterDiscount = subtotal - discount;
    const taxableAmount = Math.max(0, subtotalAfterDiscount);

    const taxAmount =
      watchedValues.totals.applyTax
        ? taxableAmount * ((watchedValues.totals.taxRate || 0) / 100)
        : 0;

    const grandTotal = taxableAmount + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  }, [
    watchedValues.lineItems,
    watchedValues.totals.discount,
    watchedValues.totals.applyTax,
    watchedValues.totals.taxRate,
  ]);
  
  useEffect(() => {
    // Reset form with initial data when it changes (on navigation)
    form.reset(initialData);
  }, [initialData, form]);

  const handlePrint = () => {
    window.print();
  };
  
  const onSubmit = async (data: Invoice) => {
    setIsSaving(true);
    try {
      const result = await saveInvoice(data);
      if (result.success && result.id) {
        toast({
          title: 'Invoice Saved!',
          description: `Invoice ${data.invoiceMeta.invoiceNumber} has been saved successfully.`,
        });
        // Use router to update the URL without a full page reload if it's a new invoice.
        if (!data.id || data.id !== result.id) {
          startTransition(() => {
            router.replace(`/invoice/${result.id}`);
          });
        }
      } else {
        toast({
          title: 'Error Saving Invoice',
          description: result.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Save failed", error);
      toast({
        title: 'Save Failed',
        description: 'Could not save your changes.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 mb-8 no-print">
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold font-headline">
                {initialData.id ? `Edit Invoice #${initialData.invoiceMeta.invoiceNumber}` : 'Create New Invoice'}
              </h1>
               {initialData.id ? null : <h2 className='text-lg text-muted-foreground'>Fill in the details below to generate your free invoice.</h2>}
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 animate-spin" />
                ) : (
                  <Save className="mr-2" />
                )}
                Save Invoice
              </Button>
              <Button onClick={handlePrint} variant="outline" type="button">
                <Download className="mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="no-print">
              <InvoiceForm />
            </div>
            <InvoicePreview data={watchedValues} totals={calculatedTotals} />
          </div>
        </form>
      </Form>
    </div>
  );
}
