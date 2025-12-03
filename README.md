# InvoiceFlow - Freelance Invoice Creator

This is a Next.js application called "InvoiceFlow" that lets a freelancer quickly create, preview, and download invoices as PDFs.

## Getting Started

First, set up your Firebase project and environment variables. Create a `.env.local` file in the root of the project and add your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Core Features

- **Invoice Creator**: Navigate to `/invoice/new` to create a new invoice using a comprehensive form.
- **Live Preview**: See a live preview of your invoice as you fill out the details.
- **AI-Powered Rate Suggestions**: Get AI-powered suggestions for line item rates based on your description.
- **Save Invoices**: Save your invoices to Firestore.
- **Download as PDF**: Download a professional-looking PDF of your invoice.
- **Invoice Management**: View and manage all your past invoices at `/invoices`.
