'use server';

import { collection, addDoc, getDocs, doc, getDoc, setDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Invoice, InvoiceSchema } from './types';
import { revalidatePath } from 'next/cache';

const convertDatesToTimestamps = (data: any): any => {
  if (data instanceof Date) {
    return Timestamp.fromDate(data);
  }
  if (Array.isArray(data)) {
    return data.map(item => convertDatesToTimestamps(item));
  }
  if (typeof data === 'object' && data !== null) {
    const res: { [key: string]: any } = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        res[key] = convertDatesToTimestamps(data[key]);
      }
    }
    return res;
  }
  return data;
};

const convertTimestampsToDates = (data: any): any => {
  if (data instanceof Timestamp) {
    return data.toDate();
  }
  if (Array.isArray(data)) {
    return data.map(item => convertTimestampsToDates(item));
  }
  if (typeof data === 'object' && data !== null) {
    const res: { [key: string]: any } = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        res[key] = convertTimestampsToDates(data[key]);
      }
    }
    return res;
  }
  return data;
};

export async function saveInvoice(invoiceData: Invoice) {
  try {
    const validatedData = InvoiceSchema.parse(invoiceData);
    const cleanedData = JSON.parse(JSON.stringify(validatedData));
    const firestoreData = convertDatesToTimestamps(cleanedData);

    let docId = invoiceData.id;
    if (docId) {
      const docRef = doc(db, 'invoices', docId);
      await setDoc(docRef, firestoreData, { merge: true });
    } else {
      const newDocRef = await addDoc(collection(db, 'invoices'), firestoreData);
      docId = newDocRef.id;
    }
    
    revalidatePath('/invoices');
    revalidatePath(`/invoice/${docId}`);

    return { success: true, id: docId };
  } catch (error) {
    console.error('Error saving invoice:', error);
    return { success: false, error: 'Failed to save invoice.' };
  }
}

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const q = query(collection(db, 'invoices'), orderBy('invoiceMeta.invoiceDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const invoices = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return convertTimestampsToDates(invoices) as Invoice[];
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
      const data = { id: docSnap.id, ...docSnap.data() };
      return convertTimestampsToDates(data) as Invoice;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }
}
