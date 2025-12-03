# **App Name**: InvoiceFlow

## Core Features:

- Invoice Form: Form to input freelancer and client details, invoice metadata, line items, totals, and payment terms.
- Dynamic Line Items: Add and remove multiple line items with description, quantity, rate, and amount fields.
- Automatic Calculations: Automatically calculate subtotal, discount, tax, and final total as the user inputs data. Includes validation for required fields.
- Invoice Preview: Live preview of the invoice in a printable layout.
- Export to PDF: Generate and download the invoice as a PDF file.
- Invoice Storage: Save and retrieve invoices from Firestore.
- Invoice Validation: AI powered tool that uses invoice templates to suggest common prices to the user

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) for a professional and trustworthy feel.
- Background color: Very light grey (#F5F5F5) to ensure a clean and uncluttered canvas.
- Accent color: Soft purple (#8E24AA) for highlighting key elements such as buttons.
- Headline font: 'Space Grotesk' (sans-serif) for headlines; Body font: 'Inter' (sans-serif) for body text. Recommended for a tech/architectural reference that still reads cleanly and is accessible.
- Use simple, professional icons for actions like save, download, and share.
- Responsive layout with form on the left and preview on the right on desktop, and form above preview on mobile.
- Subtle transitions for form element focus and updates to totals.