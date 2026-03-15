importScripts('https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC7_Ld4oV33NyoVvsyyP3HTu7pQQZpre98',
  authDomain: 'stylevault-notifications.firebaseapp.com',
  projectId: 'stylevault-notifications',
  storageBucket: 'stylevault-notifications.firebasestorage.app',
  messagingSenderId: '975038055611',
  appId: '1:975038055611:web:c1a64b449474df47f1d59e',
  measurementId: 'G-02Q29JFJL2',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'StyleVault update';
  const body = payload?.notification?.body || 'You have a new booking update.';
  const link = payload?.fcmOptions?.link || payload?.data?.link || '/';

  self.registration.showNotification(title, {
    body,
    icon: '/icon',
    badge: '/icon',
    data: {
      link,
    },
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const link = event.notification?.data?.link || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(link);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(link);
      }

      return undefined;
    })
  );
});
