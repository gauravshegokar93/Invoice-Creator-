import { InvoiceEditor } from '@/components/invoice/invoice-editor';
import { getInvoice } from '@/lib/actions';
import { defaultInvoice } from '@/lib/types';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

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
