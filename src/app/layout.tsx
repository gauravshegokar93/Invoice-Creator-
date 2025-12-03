import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from '@/components/app-header';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free Online Invoice Generator | Create Invoices Without Login',
  description: 'Create professional invoices online instantly. No login required. Free, fast invoice creator with PDF download, custom fields, branding, and tax options.',
  keywords: ['free invoice generator', 'online invoice creator', 'create invoice without login', 'invoice maker free', 'invoice template online', 'instant invoice PDF'],
  openGraph: {
    title: 'Free Online Invoice Generator — No Login Required',
    description: 'Create professional invoices instantly. Free, no signup, quick PDF download, and customizable fields.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Invoice Generator — Fast & No Login',
    description: 'Generate invoices instantly. No account needed. Free PDF downloads.',
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
