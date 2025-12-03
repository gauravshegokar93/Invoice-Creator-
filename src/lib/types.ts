
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
    name: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    phone: z.string(),
    email: z.string().email('Invalid email address.').or(z.literal('')),
    website: z.string().url('Invalid URL.').optional().or(z.literal('')),
  }),
  client: z.object({
    name: z.string(),
    designationOrTitle: z.string().optional(),
    organizationName: z.string(),
    addressLine: z.string(),
    city: z.string(),
    pincode: z.string(),
    phone: z.string(),
  }),
  invoiceMeta: z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required.'),
    poNumber: z.string().optional(),
    invoiceDate: z.date(),
    dueDate: z.date().optional(),
    currencySymbol: z.string().min(1, 'Currency is required.').default('₹'),
  }),
  lineItems: z.array(LineItemSchema).min(1, 'At least one line item is required.'),
  paymentTerms: z.object({
    termsText: z.string().optional(),
    paymentBreakup: z.string().optional(),
  }),
  bankDetails: z.object({
    bankName: z.string(),
    accountNumber: z.string(),
    ifsc: z.string(),
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
    name: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
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
    poNumber: '',
    invoiceDate: new Date(),
    currencySymbol: '₹',
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
    termsText: '',
  },
  bankDetails: {
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
  },
  footerNote: '',
  projectTimeline: "",
  extraTerms: ""
};

    