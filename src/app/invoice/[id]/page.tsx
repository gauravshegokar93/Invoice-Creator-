import { InvoiceEditor } from '@/components/invoice/invoice-editor';
import { getInvoice } from '@/lib/actions';
import { defaultInvoice } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  if (id === 'new') {
    return {
      title: 'Create New Invoice | Free Invoice Generator',
      description: 'Start creating a new professional invoice from scratch. Customize client details, line items, and payment terms instantly.',
    };
  }

  const invoice = await getInvoice(id);

  if (!invoice) {
    return {
      title: 'Invoice Not Found | InvoiceFlow',
    }
  }

  return {
    title: `Edit Invoice ${invoice.invoiceMeta.invoiceNumber} | InvoiceFlow`,
    description: `Editing invoice ${invoice.invoiceMeta.invoiceNumber} for ${invoice.client.organizationName}.`,
  };
}

export default async function InvoicePage({ params }: Props) {
  const { id } = params;

  if (id === 'new') {
    return <InvoiceEditor initialData={defaultInvoice} />;
  }

  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  return <InvoiceEditor initialData={invoice} />;
}
