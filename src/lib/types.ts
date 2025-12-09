
import { z } from 'zod';

export const LineItemSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
  details: z.string().optional(),
  quantity: z.coerce.number().min(0, 'Quantity must be positive.'),
  rate: z.coerce.number().min(0, 'Rate must be positive.'),
});
export type LineItem = z.infer<typeof LineItemSchema>;

export const InvoiceSchema = z.object({
  id: z.string().optional(),
  freelancer: z.object({
    name: z.string().min(1, 'Freelancer name is required.'),
    addressLine1: z.string().min(1, 'Address is required.'),
    addressLine2: z.string().optional(),
    city: z.string().min(1, 'City is required.'),
    state: z.string().min(1, 'State is required.'),
    pincode: z.string().min(1, 'Pincode is required.'),
    phone: z.string().min(1, 'Phone number is required.'),
    email: z.string().email('Invalid email address.').or(z.literal('')),
    website: z.string().url('Invalid URL.').optional().or(z.literal('')),
  }),
  client: z.object({
    name: z.string().min(1, 'Client name is required.'),
    designationOrTitle: z.string().optional(),
    organizationName: z.string().min(1, 'Organization name is required.'),
    addressLine: z.string().min(1, 'Address is required.'),
    city: z.string().min(1, 'City is required.'),
    pincode: z.string().min(1, 'Pincode is required.'),
    phone: z.string().min(1, 'Phone number is required.'),
  }),
  invoiceMeta: z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required.'),
    purchaseNumber: z.string().optional(),
    invoiceDate: z.date(),
    dueDate: z.date().optional().nullable().transform(val => val === undefined ? null : val),
    currencySymbol: z.string().min(1, 'Currency is required.').default('₹'),
  }),
  lineItems: z.array(LineItemSchema).min(1, 'At least one line item is required.'),
  paymentTerms: z.object({
    termsText: z.string().optional(),
    paymentBreakup: z.string().optional(),
  }),
  bankDetails: z.object({
    bankName: z.string().min(1, 'Bank name is required.'),
    accountNumber: z.string().min(1, 'Account number is required.'),
    ifsc: z.string().min(1, 'IFSC/SWIFT code is required.'),
    upiId: z.string().optional(),
  }),
  totals: z.object({
    discount: z.coerce.number().min(0).default(0),
    taxLabel: z.string().default('GST'),
    taxRate: z.coerce.number().min(0).max(100).default(18),
    applyTax: z.boolean().default(false),
  }),
  projectTimeline: z.string().optional(),
  extraTerms: z.string().optional(),
  footerNote: z.string().optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export const defaultInvoice: Invoice = {
  freelancer: {
    name: 'Your Company',
    addressLine1: '123 Street,',
    city: 'City',
    state: 'State',
    pincode: '000000',
    phone: '+91 0000000000',
    email: 'you@example.com',
    website: 'www.example.com',
  },
  client: {
    name: '',
    organizationName: '',
    addressLine: '',
    city: '',
    pincode: '',
    phone: '',
  },
  invoiceMeta: {
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
    purchaseNumber: '',
    invoiceDate: new Date(),
    currencySymbol: '₹',
    dueDate: null,
  },
  lineItems: [
    { description: '', quantity: 1, rate: 0, details: '' },
  ],
  totals: {
    discount: 0,
    taxLabel: 'GST',
    taxRate: 18,
    applyTax: false,
  },
  paymentTerms: {
    termsText: 'Payment is due within 15 days of the invoice date.',
  },
  bankDetails: {
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
  },
  footerNote: 'Thank you for your business!',
  projectTimeline: "",
  extraTerms: ""
};
