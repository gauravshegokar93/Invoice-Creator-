'use client';

import type { Invoice } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { formatAmount } from '@/lib/utils';
import { Building, Globe, Mail, Phone } from 'lucide-react';

type InvoicePreviewProps = {
  data: Invoice;
  totals: {
    subtotal: number;
    taxAmount: number;
    grandTotal: number;
  };
};

export function InvoicePreview({ data, totals }: InvoicePreviewProps) {
  const { freelancer, client, invoiceMeta, lineItems, paymentTerms, bankDetails, footerNote, projectTimeline, extraTerms } = data;

  const renderTextAsList = (text: string | undefined) => {
    if (!text) return null;
    return (
      <ul className="list-disc list-inside space-y-1">
        {text.split('\n').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}
      </ul>
    );
  };

  return (
    <div className="sticky top-24">
      <h2 className="font-headline text-lg mb-2">Live Preview</h2>
      <Card id="invoice-preview" className="w-full shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-8 text-sm text-gray-800 bg-white">
          <header className="flex justify-between items-start pb-6 border-b-2 border-gray-200">
            <div>
              <h1 className="text-3xl font-bold font-headline text-gray-900">{freelancer.name}</h1>
              <p className="text-gray-600">{freelancer.addressLine1}</p>
              <p className="text-gray-600">{freelancer.city}, {freelancer.state} {freelancer.pincode}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-semibold text-primary uppercase tracking-wider">Invoice</h2>
              <p className="text-gray-600"># {invoiceMeta.invoiceNumber}</p>
              <p className="text-gray-600">Date: {format(new Date(invoiceMeta.invoiceDate), 'PPP')}</p>
              {invoiceMeta.dueDate && <p className="text-gray-600">Due: {format(new Date(invoiceMeta.dueDate), 'PPP')}</p>}
            </div>
          </header>

          <section className="grid grid-cols-2 gap-4 my-6">
            <div>
              <h3 className="font-semibold text-gray-500 uppercase tracking-wide mb-2">Bill To</h3>
              <p className="font-bold text-gray-800">{client.organizationName}</p>
              <p className="text-gray-600">Attn: {client.name}</p>
              <p className="text-gray-600">{client.addressLine}</p>
              <p className="text-gray-600">{client.city} - {client.pincode}</p>
              <p className="text-gray-600">Phone: {client.phone}</p>
            </div>
            <div className="text-right self-end">
                <div className="flex items-center justify-end gap-3 text-gray-600"> <Mail size={14} /> {freelancer.email}</div>
                <div className="flex items-center justify-end gap-3 text-gray-600"> <Phone size={14} /> {freelancer.phone}</div>
                {freelancer.website && <div className="flex items-center justify-end gap-3 text-gray-600"> <Globe size={14} /> {freelancer.website}</div>}
            </div>
          </section>

          <section>
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold text-gray-600 uppercase w-1/2">Description</th>
                  <th className="p-3 font-semibold text-gray-600 uppercase text-center">Qty</th>
                  <th className="p-3 font-semibold text-gray-600 uppercase text-right">Rate</th>
                  <th className="p-3 font-semibold text-gray-600 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <p className="font-medium text-gray-800">{item.description}</p>
                      {item.details && <div className="text-xs text-gray-500 whitespace-pre-line">{item.details}</div>}
                    </td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">{formatAmount(item.rate)}</td>
                    <td className="p-3 text-right font-medium">{formatAmount(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="flex justify-end mt-6">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{invoiceMeta.currencySymbol} {formatAmount(totals.subtotal)}</span>
              </div>
              {data.totals.discount > 0 && <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>- {invoiceMeta.currencySymbol} {formatAmount(data.totals.discount)}</span>
              </div>}
              {data.totals.applyTax && <div className="flex justify-between text-gray-600">
                <span>{data.totals.taxLabel}</span>
                <span>+ {invoiceMeta.currencySymbol} {formatAmount(totals.taxAmount)}</span>
              </div>}
              <Separator />
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Grand Total</span>
                <span>{invoiceMeta.currencySymbol} {formatAmount(totals.grandTotal)}</span>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-600">
            {paymentTerms.termsText && <div>
              <h4 className="font-semibold text-gray-800 mb-2 uppercase tracking-wide">Payment Terms</h4>
              <div className="whitespace-pre-line">{paymentTerms.termsText}</div>
            </div>}
             <div>
              <h4 className="font-semibold text-gray-800 mb-2 uppercase tracking-wide">Bank Details</h4>
              <p><span className="font-medium">Bank:</span> {bankDetails.bankName}</p>
              <p><span className="font-medium">A/C No:</span> {bankDetails.accountNumber}</p>
              <p><span className="font-medium">IFSC:</span> {bankDetails.ifsc}</p>
              {bankDetails.upiId && <p><span className="font-medium">UPI:</span> {bankDetails.upiId}</p>}
            </div>
            {projectTimeline && <div>
                <h4 className="font-semibold text-gray-800 mb-2 uppercase tracking-wide">Project Timeline</h4>
                {renderTextAsList(projectTimeline)}
            </div>}
            {extraTerms && <div>
                <h4 className="font-semibold text-gray-800 mb-2 uppercase tracking-wide">Terms & Conditions</h4>
                {renderTextAsList(extraTerms)}
            </div>}
          </section>

          {footerNote && <footer className="mt-12 pt-6 border-t-2 text-center text-gray-500 font-semibold">
            <p>{footerNote}</p>
          </footer>}
        </CardContent>
      </Card>
    </div>
  );
}
