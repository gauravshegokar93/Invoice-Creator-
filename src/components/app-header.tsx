import Link from 'next/link';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/invoices" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              InvoiceFlow
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/invoices">My Invoices</Link>
            </Button>
            <Button asChild>
                <Link href="/invoice/new">Create Invoice</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
