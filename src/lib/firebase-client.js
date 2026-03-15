import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyC7_Ld4oV33NyoVvsyyP3HTu7pQQZpre98',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'stylevault-notifications.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'stylevault-notifications',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'stylevault-notifications.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '975038055611',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:975038055611:web:c1a64b449474df47f1d59e',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-02Q29JFJL2',
};

export const firebaseVapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  || 'BKVRKs4aXdRo3mJ1Z_iDG2G45LvjcCGFuwJPZ1RajqvbCoWdsIlUh7Gi4xgNFunfUZrJNKl4271H_Oe8Wk7633M';

export const isFirebaseMessagingConfigured = () => Boolean(
  firebaseConfig.apiKey
  && firebaseConfig.projectId
  && firebaseConfig.messagingSenderId
  && firebaseVapidKey
);

export const getFirebaseAppInstance = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }

  return getApp();
};

export const getBrowserMessaging = async () => {
  if (
    typeof window === 'undefined'
    || !('Notification' in window)
    || !('serviceWorker' in navigator)
    || !isFirebaseMessagingConfigured()
  ) {
    return null;
  }

  const { getMessaging, isSupported } = await import('firebase/messaging');
  const supported = await isSupported().catch(() => false);

  if (!supported) {
    return null;
  }

  return getMessaging(getFirebaseAppInstance());
};
