
'use server';

import { Invoice, InvoiceSchema } from './types';
import { revalidatePath } from 'next/cache';
import { db } from './firebase';
import { collection, doc, setDoc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';

// Helper to convert all Date objects in invoice data to Firestore Timestamps
function serializeDates(data: any): any {
    if (data instanceof Date) {
        return data; // Firestore handles Date objects automatically
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

// Helper to convert Firestore Timestamps back to Date objects
function deserializeDates(data: any): any {
    if (data && typeof data.toMillis === 'function') { // Check for Firestore Timestamp
        return data.toDate();
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
    const serializableData = serializeDates(validatedData);
    
    let docId = serializableData.id;
    const invoicesCollection = collection(db, 'invoices');

    if (docId) {
      // Update existing invoice
      const docRef = doc(db, 'invoices', docId);
      await setDoc(docRef, serializableData, { merge: true });
    } else {
      // Create new invoice
      const newDocRef = doc(invoicesCollection);
      docId = newDocRef.id;
      const newInvoice = { ...serializableData, id: docId };
      await setDoc(newDocRef, newInvoice);
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
    const invoicesCollection = collection(db, 'invoices');
    const q = query(invoicesCollection, orderBy('invoiceMeta.invoiceDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const invoices = querySnapshot.docs.map(doc => deserializeDates(doc.data() as Invoice));
    return invoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  try {
    if (id === 'new') return null;
    const docRef = doc(db, 'invoices', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return deserializeDates(docSnap.data() as Invoice);
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }
}
