
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
import { useEffect, useMemo, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useDebouncedCallback } from 'use-debounce';

type InvoiceEditorProps = {
  initialData: Invoice;
};

export function InvoiceEditor({ initialData }: InvoiceEditorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

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
      watchedValues.totals.applyTax && watchedValues.totals.taxRate > 0
        ? taxableAmount * (watchedValues.totals.taxRate / 100)
        : 0;

    const grandTotal = taxableAmount + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  }, [
    watchedValues.lineItems,
    watchedValues.totals.discount,
    watchedValues.totals.applyTax,
    watchedValues.totals.taxRate,
  ]);


  const debouncedSave = useDebouncedCallback(async (data: Invoice) => {
    setIsSaving(true);
    try {
      const result = await saveInvoice(data);
      if (result.success && result.id) {
        if (!data.id) {
          // This is a new invoice, redirect to the new URL to avoid creating duplicates
          router.replace(`/invoice/${result.id}`);
        } else if (data.id !== result.id) {
           // This case handles if the initial data was for a new invoice, but it has been saved.
           router.replace(`/invoice/${result.id}`);
        }
      } else {
        toast({
          title: 'Error Saving Invoice',
          description: result.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Autosave failed", error);
      toast({
        title: 'Autosave Failed',
        description: 'Could not save your changes.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Only trigger save if it's not just a state update from reset
      if (name) {
        debouncedSave(value as Invoice);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSave]);

  useEffect(() => {
    // Reset form with initial data when it changes (on navigation)
    form.reset(initialData);
  }, [initialData, form]);

  const handlePrint = () => {
    window.print();
  };
  
  // No-op submit handler, as saving is done via autosave
  const onSubmit = () => {};

  return (
    <div className="p-4 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold font-headline">
              {initialData.id ? 'Edit Invoice' : 'Create New Invoice'}
            </h1>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save /> Saved
                  </>
                )}
              </div>
              <Button onClick={handlePrint} variant="outline" type="button">
                <Download className="mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InvoiceForm />
            <InvoicePreview data={watchedValues} totals={calculatedTotals} />
          </div>
        </form>
      </Form>
    </div>
  );
}
