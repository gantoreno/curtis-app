/* eslint-disable import/no-unresolved */
import '@firebase/auth';
import '@firebase/firestore';

import firebase from '@firebase/app';
import {
  FIREBASE_APP_ID,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
} from '@env';

const firebaseConfig = {
  appId: FIREBASE_APP_ID,
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  measurementId: FIREBASE_STORAGE_BUCKET,
  storageBucket: FIREBASE_MEASUREMENT_ID,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
