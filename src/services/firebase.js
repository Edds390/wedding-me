import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

import {GoogleAuthProvider} from "firebase/auth";
// import {firestore} from "firebase/firestore";

import config from "../firebase_config";

initializeApp(config);

// Auth
export const auth = getAuth();
export const googleAuth = new GoogleAuthProvider();

export const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5000',
    // This must be true.
    handleCodeInApp: true,
  };

// Firestore
// export const firestore = firebase.firestore();
export const db = getDatabase(
    undefined,
    'https://wedding-me-ff80b-default-rtdb.asia-southeast1.firebasedatabase.app'
  );
