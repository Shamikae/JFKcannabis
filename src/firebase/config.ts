import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfS7d-byBJgdOgxrLDJKrCqJ35H7_-a1I",
  authDomain: "jfk-cannabis-5b093.firebaseapp.com",
  projectId: "jfk-cannabis-5b093",
  storageBucket: "jfk-cannabis-5b093.firebasestorage.app",
  messagingSenderId: "1013288387541",
  appId: "1:1013288387541:web:59b7e2d528526f3c2ef35c",
  measurementId: "G-PNNKG9X708"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, storage, auth, analytics };