
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
    name: z.string().min(1, 'Your name is required.'),
    addressLine1: z.string().min(1, 'Address is required.'),
    addressLine2: z.string().optional(),
    city: z.string().min(1, 'City is required.'),
    state: z.string().min(1, 'State is required.'),
    pincode: z.string().min(1, 'Pincode is required.'),
    phone: z.string().min(1, 'Phone is required.'),
    email: z.string().email('Invalid email address.'),
    website: z.string().url('Invalid URL.').optional().or(z.literal('')),
  }),
  client: z.object({
    name: z.string().min(1, "Client's name is required."),
    designationOrTitle: z.string().optional(),
    organizationName: z.string().min(1, "Organization name is required."),
    addressLine: z.string().min(1, "Client's address is required."),
    city: z.string().min(1, "Client's city is required."),
    pincode: z.string().min(1, "Client's pincode is required."),
    phone: z.string().min(1, "Client's phone is required."),
  }),
  invoiceMeta: z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required.'),
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
    bankName: z.string().min(1, 'Bank name is required.'),
    accountNumber: z.string().min(1, 'Account number is required.'),
    ifsc: z.string().min(1, 'IFSC code is required.'),
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
