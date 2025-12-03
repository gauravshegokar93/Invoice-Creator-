'use server';

import { Invoice, InvoiceSchema } from './types';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';

// In-memory store for invoices
let invoices: Invoice[] = [];

export async function saveInvoice(invoiceData: Invoice) {
  try {
    const validatedData = InvoiceSchema.parse(invoiceData);
    
    let docId = validatedData.id;

    if (docId) {
      // Update existing invoice
      const index = invoices.findIndex(inv => inv.id === docId);
      if (index !== -1) {
        invoices[index] = validatedData;
      } else {
        // If not found, you might want to treat it as a new one or throw an error
        // For simplicity, we'll add it if not found
        invoices.push(validatedData);
      }
    } else {
      // Create new invoice
      docId = randomUUID();
      const newInvoice = { ...validatedData, id: docId };
      invoices.push(newInvoice);
    }
    
    revalidatePath('/invoices');
    revalidatePath(`/invoice/${docId}`);

    return { success: true, id: docId };
  } catch (error) {
    console.error('Error saving invoice:', error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to save invoice.' };
  }
}

export async function getInvoices(): Promise<Invoice[]> {
  try {
    // Sort invoices by date in descending order
    const sortedInvoices = [...invoices].sort((a, b) => {
        const dateA = new Date(a.invoiceMeta.invoiceDate);
        const dateB = new Date(b.invoiceMeta.invoiceDate);
        return dateB.getTime() - dateA.getTime();
    });
    return JSON.parse(JSON.stringify(sortedInvoices));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  try {
    if (id === 'new') return null;
    const invoice = invoices.find(inv => inv.id === id);

    if (invoice) {
      return JSON.parse(JSON.stringify(invoice));
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }
}
