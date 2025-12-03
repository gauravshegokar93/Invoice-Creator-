
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Invoice Generator - Create Invoices Online Instantly',
  description: 'The best free invoice generator. Create professional invoices in seconds without signing up. Download as PDF instantly. Perfect for freelancers and small businesses.',
};

const features = [
  { name: 'Completely Free', description: 'Generate unlimited invoices with no hidden fees or charges.' },
  { name: 'No Login Required', description: 'Create and download invoices instantly without creating an account. Your privacy is protected.' },
  { name: 'Instant PDF Downloads', description: 'Generate professional, print-ready PDF invoices with a single click.' },
  { name: 'Professional Templates', description: 'Choose from clean, modern templates that make your business look its best.' },
  { name: 'Customization Options', description: 'Add your company details, logo, taxes, discounts, and custom payment terms.' },
  { name: 'Automatic Calculations', description: 'The tool automatically calculates subtotals, taxes, and grand totals, saving you time and preventing errors.' },
  { name: 'Multi-Currency Support', description: 'Bill clients in their local currency with support for USD, EUR, GBP, and more.' },
  { name: 'Works on Any Device', description: 'Create invoices on your desktop, tablet, or smartphone. Our tool is fully responsive.' },
];

const faqs = [
    {
        question: 'How do I create an invoice online for free?',
        answer: 'Simply fill in your details, your client\'s details, and the line items for your work. Our tool will instantly generate a professional invoice for you to download as a PDF, no login required.'
    },
    {
        question: 'Can I download the invoice as a PDF?',
        answer: 'Yes! After you create your invoice, you can instantly download a high-quality, print-ready PDF file by clicking the "Download PDF" button.'
    },
    {
        question: 'Do I need to sign up or create an account?',
        answer: 'No. Our invoice generator is completely free to use without any need to sign up or log in. Your data is private and is not stored on our servers unless you choose to save the invoice.'
    },
    {
        question: 'Is this free invoice generator secure?',
        answer: 'Yes, your privacy is a top priority. The app operates directly in your browser, and no invoice data is saved unless you explicitly click the "Save Invoice" button, which stores it securely in a database only you can access.'
    }
]

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              Free Online Invoice Generator
            </h1>
            <h2 className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create professional invoices in seconds. No login, no watermarks, no limits. The fast, free, and private way to bill your clients.
            </h2>
            <Button asChild size="lg">
              <Link href="/invoice/new">Create Your Free Invoice Now</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Use Our Free Invoice Maker?</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Focus on speed, privacy, and zero friction. Get your invoicing done and get back to business.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg">{feature.name}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">Create an Invoice in 3 Simple Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                        <h3 className="text-xl font-semibold mb-2">Enter Your Details</h3>
                        <p className="text-muted-foreground">Fill in your and your client’s information. Add your logo for a professional touch.</p>
                    </div>
                    <div>
                        <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                        <h3 className="text-xl font-semibold mb-2">Add Line Items</h3>
                        <p className="text-muted-foreground">Describe your services or products, and set quantities, rates, taxes, and discounts.</p>
                    </div>
                    <div>
                        <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                        <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
                        <p className="text-muted-foreground">Preview your invoice, then instantly download a professional, print-ready PDF. No signup needed.</p>
                    </div>
                </div>
            </div>
        </section>


        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mt-3">Quick answers to common questions. If you need more help, feel free to contact us.</p>
            </div>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                            <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
