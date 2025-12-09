import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Download, Edit, FileText, BarChart } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free Online Invoice Generator | Create Invoices Instantly',
  description: 'Create professional invoices for free with our online invoice generator. No login required. Instantly download, print, or send PDF invoices.',
};

const faqs = [
  {
    question: "Is this online invoice generator completely free to use?",
    answer: "Yes, InvoiceFlow is 100% free. You can create, download, and send unlimited invoices without any hidden charges, watermarks, or usage limits. No account or credit card is required."
  },
  {
    question: "Do I need to sign up or create an account?",
    answer: "No. Our core value is providing a tool with zero friction. You can generate a professional invoice instantly without creating an account. Your privacy is paramount, and no data is stored unless you choose to save it."
  },
  {
    question: "Can I download my invoice as a PDF?",
    answer: "Absolutely. Once your invoice is ready, you can click the 'Download PDF' button to get a high-resolution, print-ready PDF file instantly. It's clean, professional, and has no watermarks."
  },
  {
    question: "Can I add my business logo to the invoice?",
    answer: "Yes, you can easily upload your company logo. It will be positioned prominently on your invoice, helping you maintain a strong brand identity and look professional."
  },
  {
    question: "Does the tool support different currencies and taxes like GST/VAT?",
    answer: "Yes. Our invoice generator supports multiple currencies (USD, EUR, GBP, INR, and more). You can also apply custom taxes, such as GST or VAT, and set the appropriate rate for your jurisdiction."
  },
  {
    question: "How are invoice totals and taxes calculated?",
    answer: "InvoiceFlow handles all calculations automatically. It computes line item totals, the subtotal, discounts, and tax amounts, and provides a final grand total, eliminating manual errors and saving you time."
  },
  {
    question: "Is my data secure?",
    answer: "Your privacy is our priority. The invoice data you enter is processed directly in your browser and is not stored on our servers unless you explicitly save the invoice. You remain in full control of your information."
  },
  {
    question: "Can I edit an invoice after creating it?",
    answer: "Yes. If you save an invoice, you can access it later from the 'My Invoices' section to edit, update, or resend it. This makes managing recurring clients and projects much more efficient."
  },
  {
    question: "Who is this invoice maker best for?",
    answer: "InvoiceFlow is ideal for freelancers, small business owners, contractors, consultants, and anyone who needs to send a professional invoice quickly. It's built to be simple for individuals but powerful enough for businesses."
  },
  {
    question: "Does this tool work on mobile devices?",
    answer: "Yes, our invoice generator is fully responsive. You can create, edit, and send invoices from your desktop, tablet, or smartphone, allowing you to manage your billing from anywhere."
  }
];


const schema = {
  software: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InvoiceFlow - Free Online Invoice Generator",
    "operatingSystem": "Any (Web-based)",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1572"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create, download, and send professional invoices for free. No login required. Features PDF download, logo upload, multi-currency support, and automatic calculations for freelancers and small businesses.",
    "url": "https://invoice-generator-free.in",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "InvoiceFlow"
    }
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
};


export default function HomePage() {
  return (
    <>
      <Script id="software-schema" type="application/ld+json">
        {JSON.stringify(schema.software)}
      </Script>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(schema.faq)}
      </Script>

      <div className="bg-background text-foreground">
        <main>
          {/* Hero Section */}
          <section className="py-20 md:py-28 text-center bg-gray-50/50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">
                Free Online Invoice Generator
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Create professional invoices in seconds. No login required. The fastest way to bill your clients and get paid, trusted by thousands of freelancers and small businesses worldwide.
              </p>
              <div className="flex justify-center items-center gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/invoice/new">Create Your Invoice Now</Link>
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <p>✓ 100% Free to use &nbsp; ✓ No signup required &nbsp; ✓ Instant PDF download</p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Invoice in 30 Seconds. It's That Simple.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Our intuitive invoice maker lets you generate a professional, error-free invoice in just three simple steps. Get it to your client instantly and get paid faster.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="flex flex-col items-center">
                  <div className="bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">1</div>
                  <h3 className="text-xl font-semibold mb-2">Fill in the Details</h3>
                  <p className="text-muted-foreground">Enter your and your client’s information, upload your logo, and specify the invoice number and dates. It’s fast and straightforward.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">2</div>
                  <h3 className="text-xl font-semibold mb-2">Add Your Services</h3>
                  <p className="text-muted-foreground">List your services or products with quantities and rates. Let our tool automatically calculate totals, taxes, and discounts, ensuring 100% accuracy.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">3</div>
                  <h3 className="text-xl font-semibold mb-2">Download or Send</h3>
                  <p className="text-muted-foreground">Instantly download a professional PDF, or save the invoice to get a shareable link. No watermarks, no limits, and completely free forever.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Essential Parts of an Invoice */}
          <section id="invoice-elements" className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">The Anatomy of a Professional Invoice</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Including the right information ensures you get paid on time and maintain clear records. Our free invoice creator includes all the essential components to make you look professional.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: FileText, title: 'Header & Invoice Number', text: 'Clearly state "Invoice" and include a unique invoice number for tracking and accounting.' },
                  { icon: FileText, title: 'Your Business Details', text: 'Your company name, address, and contact information to establish your identity.' },
                  { icon: FileText, title: 'Client Information', text: 'The name and address of the person or company you are billing to ensure proper delivery.' },
                  { icon: FileText, title: 'Dates', text: 'The invoice issue date and the payment due date to set clear payment expectations.' },
                  { icon: FileText, title: 'Line Items', text: 'A detailed breakdown of services or products, including quantity, rate, and total amount for each.' },
                  { icon: FileText, title: 'Totals & Taxes', text: 'A clear summary of the subtotal, discount, tax (like GST/VAT), and the final grand total.' },
                  { icon: FileText, title: 'Payment Terms', text: 'Your payment instructions, accepted methods, and any late fee policies.' },
                  { icon: FileText, title: 'Notes Section', text: 'A space for a personal thank you, project details, or other important information.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Why Use a Generator */}
           <section id="why-generator" className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ditch the Templates. Save Hours.</h2>
                        <p className="text-muted-foreground mb-6">Using Word or Excel invoice templates feels free, but it costs you valuable time and introduces risk. Manual calculations lead to errors, file versions get messy, and you waste hours on repetitive data entry. Our online invoice generator automates the entire process so you can focus on your work.</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/>
                                <span><strong className="text-foreground">Eliminate Costly Errors:</strong> Automatic calculations for totals, taxes, and discounts mean no more embarrassing math mistakes.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/>
                                <span><strong className="text-foreground">Look More Professional:</strong> Send clean, beautifully designed invoices that build client trust and reinforce your brand identity.</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/>
                                <span><strong className="text-foreground">Get Paid Faster:</strong> A professional invoice with clear payment terms and an obvious due date encourages prompt payment from clients.</span>
                            </li>
                        </ul>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/invoice/new">Create an Invoice and See the Difference</Link>
                        </Button>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h3 className="font-bold text-lg mb-4 text-center">Templates vs. InvoiceFlow</h3>
                        <div className="flow-root">
                           <ul className="divide-y divide-gray-200">
                                <li className="py-3"><strong className="text-red-500">Excel/Word:</strong> Repetitive, manual data entry for every single invoice.</li>
                                <li className="py-3"><strong className="text-green-500">InvoiceFlow:</strong> Save clients and items to reuse them instantly (optional).</li>
                                <li className="py-3"><strong className="text-red-500">Excel/Word:</strong> High risk of formula errors and miscalculations.</li>
                                <li className="py-3"><strong className="text-green-500">InvoiceFlow:</strong> All totals, taxes, and discounts are auto-calculated with 100% accuracy.</li>
                                <li className="py-3"><strong className="text-red-500">Excel/Word:</strong> Messy file management, version control issues, and hard to track.</li>
                                <li className="py-3"><strong className="text-green-500">InvoiceFlow:</strong> All saved invoices are safely organized in one dashboard.</li>
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
          </section>


          {/* FAQ Section */}
          <section id="faq" className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mt-3">Everything you need to know about creating professional invoices with our free online tool.</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="shadow-sm">
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
    </>
  );
}
