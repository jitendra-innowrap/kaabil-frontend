importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAIqXfvZeuOBKdgWLCxKZNAXUykd4lj6tA",
  authDomain: "missioneven-4eef9.firebaseapp.com",
  projectId: "missioneven-4eef9",
  storageBucket: "missioneven-4eef9.appspot.com",
  messagingSenderId: "538215499239",
  appId: "1:538215499239:web:7374b5317555ef70a1e942",
  measurementId: "G-ZWEFY9NVKP"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  let url = '/'; // Default URL to open
  
  // Check if it's a job detail notification (type 3)
  if (event.notification.data && event.notification.data.type === "3" && event.notification.data.job_id) {
    url = `/jobs/detail/${event.notification.data.job_id}`;
  }

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Check if there's already a tab open with our domain
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // If we found a matching tab, navigate it to the correct URL and focus
          return client.navigate(url).then(focusedClient => {
            if (focusedClient) {
              return focusedClient.focus();
            }
          });
        }
      }
      
      // If no matching tab found, open a new one
      return self.clients.openWindow(url);
    })
  );
});

messaging.onBackgroundMessage((payload) => {
  try {
    if (!payload) {
      console.error('Payload is undefined');
      return;
    }

    const notificationTitle = payload.notification?.title || 
                             payload.data?.company_name || 
                             'New Notification';
    
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.title || '',
      icon: payload.notification?.icon || payload.data?.company_logo || '/icons/default-updated.png',
      data: payload.data || {}
    };

    return self.registration.showNotification(notificationTitle, notificationOptions)
      .then(() => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'NEW_NOTIFICATION',
              payload: payload
            });
          });
        });
      });
  } catch (error) {
    console.error('Error in background message handler:', error);
  }
});