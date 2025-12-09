
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from '@/components/app-header';
import Script from 'next/script';

const siteUrl = 'https://invoice-generator-free.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Free Online Invoice Generator | Create Invoices Without Login',
  description: 'Create professional invoices online instantly with our free invoice generator. No login required. Fast, easy, and customizable with PDF download. Perfect for freelancers and small businesses.',
  keywords: ['free invoice generator', 'online invoice creator', 'create invoice without login', 'invoice maker free', 'invoice template online', 'instant invoice PDF', 'freelance invoice template', 'small business invoicing'],
  openGraph: {
    title: 'InvoiceFlow | The Ultimate Free Online Invoice Generator',
    description: 'Create professional invoices in seconds. No signup, unlimited free invoices, and instant PDF downloads. Perfect for freelancers and small businesses.',
    url: siteUrl,
    type: 'website',
    images: [`${siteUrl}/og-image.png`], 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvoiceFlow: Free Online Invoice Generator (No Login Required)',
    description: 'The fastest way to create and send professional invoices. Free, no limits, no signup. Get your invoice as a PDF instantly.',
    images: [`${siteUrl}/twitter-image.png`],
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
        />
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

    