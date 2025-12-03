import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from '@/components/app-header';

export const metadata: Metadata = {
  title: 'InvoiceFlow | Free & Simple Invoice Generator',
  description: 'Create, preview, and download professional invoices for free. The perfect invoice maker for freelancers and small businesses. Generate and download PDF invoices in seconds.',
  keywords: ['invoice generator', 'free invoice maker', 'invoice template', 'freelance invoice', 'small business invoice', 'create invoice', 'download pdf invoice'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="min-h-screen bg-background">
          <AppHeader />
          <main>{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
