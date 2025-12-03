
'use server';

import { Invoice, InvoiceSchema } from './types';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';

// In-memory store for invoices
let invoices: Invoice[] = [];

// Helper to convert Date objects in invoice data to strings
function serializeDates(data: any): any {
  if (data instanceof Date) {
    return data.toISOString();
  }
  if (Array.isArray(data)) {
    return data.map(serializeDates);
  }
  if (typeof data === 'object' && data !== null) {
    const newData: {[key: string]: any} = {};
    for (const key in data) {
      newData[key] = serializeDates(data[key]);
    }
    return newData;
  }
  return data;
}

// Helper to convert date strings back to Date objects
function deserializeDates(data: any): any {
    if (typeof data === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(data)) {
      const date = new Date(data);
      if (!isNaN(date.getTime())) {
          return date;
      }
    }
    if (Array.isArray(data)) {
      return data.map(deserializeDates);
    }
    if (typeof data === 'object' && data !== null) {
      const newData: {[key: string]: any} = {};
      for (const key in data) {
        newData[key] = deserializeDates(data[key]);
      }
      return newData;
    }
    return data;
}


export async function saveInvoice(invoiceData: Invoice) {
  try {
    const validatedData = InvoiceSchema.parse(invoiceData);
    
    // Convert dates to strings before storing
    const serializableData = serializeDates(validatedData);
    
    let docId = serializableData.id;

    if (docId) {
      // Update existing invoice
      const index = invoices.findIndex(inv => inv.id === docId);
      if (index !== -1) {
        invoices[index] = serializableData;
      } else {
        invoices.push(serializableData);
      }
    } else {
      // Create new invoice
      docId = randomUUID();
      const newInvoice = { ...serializableData, id: docId };
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
    // Convert date strings back to Date objects before sending to client
    return deserializeDates(sortedInvoices);
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
       // Convert date strings back to Date objects
      return deserializeDates(invoice);
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }
}
