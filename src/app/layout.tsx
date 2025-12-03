import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from '@/components/app-header';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free Online Invoice Generator | Create Invoices Instantly',
  description: 'Create professional invoices for free with our online invoice generator. No login required. Instantly download, print, or send PDF invoices.',
  keywords: ['free online invoice generator', 'invoice maker', 'create invoice online', 'invoice generator without login', 'instant invoice PDF', 'freelance invoice template', 'small business invoicing'],
  openGraph: {
    title: 'InvoiceFlow | The Ultimate Free Online Invoice Generator',
    description: 'Create professional invoices in seconds. No signup, unlimited free invoices, and instant PDF downloads. Perfect for freelancers and small businesses.',
    url: 'https://invoiceflow.app', // Replace with your actual domain
    type: 'website',
    images: ['https://invoiceflow.app/og-image.png'], // Replace with your actual preview image URL
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvoiceFlow: Free Online Invoice Generator (No Login Required)',
    description: 'The fastest way to create and send professional invoices. Free, no limits, no signup. Get your invoice as a PDF instantly.',
    images: ['https://invoiceflow.app/twitter-image.png'], // Replace with your actual preview image URL
  },
};


const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        <div className="flex flex-col min-h-screen bg-background">
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <footer className="w-full border-t bg-background/95 p-4 text-center text-sm text-muted-foreground">
            Contact us: <a href="mailto:renderlabsolutions@gmail.com" className="font-medium text-primary hover:underline">renderlabsolutions@gmail.com</a>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
