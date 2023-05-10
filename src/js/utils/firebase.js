// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBp-gItuwIlIaaBjKmUaSMnu7JNri7qNB4',
  authDomain: 'story-app-a4b2b.firebaseapp.com',
  projectId: 'story-app-a4b2b',
  storageBucket: 'story-app-a4b2b.appspot.com',
  messagingSenderId: '235185997898',
  appId: '1:235185997898:web:a9578cd33825e591f0feb3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, auth, db, storage };
