import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './config';

// Products
export const getProducts = async () => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

export const addProduct = async (productData: any) => {
  const productsRef = collection(db, 'products');
  return await addDoc(productsRef, {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateProduct = async (id: string, productData: any) => {
  const docRef = doc(db, 'products', id);
  return await updateDoc(docRef, {
    ...productData,
    updatedAt: serverTimestamp()
  });
};

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  return await deleteDoc(docRef);
};

// Inventory
export const getInventory = async () => {
  const inventoryRef = collection(db, 'inventory');
  const snapshot = await getDocs(inventoryRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateInventoryItem = async (id: string, data: any) => {
  const docRef = doc(db, 'inventory', id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// Orders
export const getOrders = async (limit = 100) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getOrdersByStatus = async (status: string) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('status', '==', status), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (id: string, status: string) => {
  const docRef = doc(db, 'orders', id);
  return await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp()
  });
};

// Customers
export const getCustomers = async () => {
  const customersRef = collection(db, 'customers');
  const snapshot = await getDocs(customersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCustomer = async (id: string) => {
  const docRef = doc(db, 'customers', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

export const updateCustomer = async (id: string, data: any) => {
  const docRef = doc(db, 'customers', id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// Analytics
export const getAnalytics = async (period = 'month') => {
  const analyticsRef = collection(db, 'analytics');
  const q = query(analyticsRef, where('period', '==', period), orderBy('date', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

// File Upload
export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const deleteFile = async (path: string) => {
  const storageRef = ref(storage, path);
  return await deleteObject(storageRef);
};

// Content Management
export const getContent = async (type: string) => {
  const contentRef = collection(db, 'content');
  const q = query(contentRef, where('type', '==', type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateContent = async (id: string, data: any) => {
  const docRef = doc(db, 'content', id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// Sales Data
export const getSalesData = async (period = 'month', limit = 12) => {
  const salesRef = collection(db, 'sales');
  const q = query(salesRef, where('period', '==', period), orderBy('date', 'desc'), limit(limit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Forecasts
export const getForecasts = async () => {
  const forecastsRef = collection(db, 'forecasts');
  const snapshot = await getDocs(forecastsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Helper function to convert Firebase timestamp to Date
export const timestampToDate = (timestamp: Timestamp) => {
  return timestamp ? timestamp.toDate() : null;
};

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getInventory,
  updateInventoryItem,
  getOrders,
  getOrdersByStatus,
  updateOrderStatus,
  getCustomers,
  getCustomer,
  updateCustomer,
  getAnalytics,
  uploadFile,
  deleteFile,
  getContent,
  updateContent,
  getSalesData,
  getForecasts,
  timestampToDate
};