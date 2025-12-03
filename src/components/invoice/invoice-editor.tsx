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

type InvoiceEditorProps = {
  initialData: Invoice;
};

export function InvoiceEditor({ initialData }: InvoiceEditorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const taxAmount = watchedValues.totals.applyTax
      ? subtotalAfterDiscount * ((watchedValues.totals.taxRate || 0) / 100)
      : 0;
    const grandTotal = subtotalAfterDiscount + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  }, [watchedValues.lineItems, watchedValues.totals]);

  const handlePrint = () => {
    window.print();
  };

  const onSubmit = (data: Invoice) => {
    setIsSubmitting(true);
    startTransition(async () => {
      try {
        const result = await saveInvoice(data);
        if (result.success && result.id) {
          toast({
            title: 'Invoice Saved!',
            description: `Invoice ${data.invoiceMeta.invoiceNumber} has been saved.`,
          });
          if (!data.id) {
            router.push(`/invoice/${result.id}`);
            router.refresh();
          }
        } else {
          toast({
            title: 'Error Saving Invoice',
            description: result.error || 'An unknown error occurred.',
            variant: 'destructive',
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    });
  };
  
  // Effect to update URL with new ID after creation
  useEffect(() => {
    if (initialData.id && form.getValues('id') !== initialData.id) {
        form.setValue('id', initialData.id);
    }
  }, [initialData.id, form]);

  return (
    <div className="p-4 md:p-8">
       <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold font-headline">
              {initialData.id ? 'Edit Invoice' : 'Create New Invoice'}
            </h1>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" type="button">
                <Download className="mr-2" />
                Download PDF
              </Button>
              <Button type="submit" disabled={isPending || isSubmitting}>
                {isPending || isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
                {isPending || isSubmitting ? 'Saving...' : 'Save Invoice'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InvoiceForm form={form} />
            <InvoicePreview data={watchedValues} totals={calculatedTotals} />
          </div>
       </form>
    </div>
  );
}
