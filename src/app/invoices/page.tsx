import { getInvoices } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePlus2, Eye } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Invoice } from '@/lib/types';
import { formatAmount } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Invoices | InvoiceFlow',
  description: 'View, manage, and edit all your saved invoices in one place.',
};

function calculateGrandTotal(invoice: Invoice) {
    const subtotal = invoice.lineItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const discount = invoice.totals.discount || 0;
    const subtotalAfterDiscount = subtotal - discount;
    const taxAmount = invoice.totals.applyTax ? subtotalAfterDiscount * (invoice.totals.taxRate / 100) : 0;
    return subtotalAfterDiscount + taxAmount;
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-2xl">Your Invoices</CardTitle>
            <CardDescription>A list of all your saved invoices.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/invoice/new">
              <FilePlus2 className="mr-2 h-4 w-4" />
              New Invoice
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceMeta.invoiceNumber}</TableCell>
                      <TableCell>{invoice.client.organizationName}</TableCell>
                      <TableCell>{format(new Date(invoice.invoiceMeta.invoiceDate), 'PPP')}</TableCell>
                      <TableCell className="text-right">
                        {invoice.invoiceMeta.currencySymbol}{' '}
                        {formatAmount(calculateGrandTotal(invoice))}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/invoice/${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View/Edit</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No invoices found. Create your first one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
