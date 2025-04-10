importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAIqXfvZeuOBKdgWLCxKZNAXUykd4lj6tA",
  authDomain: "missioneven-4eef9.firebaseapp.com",
  projectId: "missioneven-4eef9",
  storageBucket: "missioneven-4eef9.appspot.com", // Fixed the storageBucket format
  messagingSenderId: "538215499239",
  appId: "1:538215499239:web:7374b5317555ef70a1e942",
  measurementId: "G-ZWEFY9NVKP"
};

const firebaseTest ={
  apiKey: "AIzaSyBZXmPayrr5GQp0GeI99wmd82w6fxl6BzY",
  authDomain: "kaabil-87339.firebaseapp.com",
  projectId: "kaabil-87339",
  storageBucket: "kaabil-87339.firebasestorage.app",
  messagingSenderId: "972940526001",
  appId: "1:972940526001:web:6e626a2faa3122c382bd90",
  vapidKey: "BBAAt4cFYf-wqtm786_CTLMIp3GBqPHByoIxDCIugCLy-6XCSW3JOEK6LeqNS8HvcyEo7P9M7p2LNSqgQG2yoTU" //test account
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseTest); // test config
const messaging = firebase.messaging();

// Add a global error handler
self.addEventListener('error', (event) => {
  console.error('Service Worker Error:', event.error);
});

messaging.onBackgroundMessage((payload) => {
  try {
    // console.log('Full payload:', JSON.stringify(payload));
    
    // Check if payload exists
    if (!payload) {
      console.error('Payload is undefined');
      return;
    }

    // Handle both notification and data payloads
    const notificationTitle = payload.notification?.title || 
                             payload.data?.company_name || 
                             'New Notification';
    
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.title || '',
      icon: payload.notification?.icon || payload.data?.company_logo || '/icons/default-updated.png',
      data: payload.data || {} // Pass all data to the notification
    };

    // console.log('Preparing notification:', notificationTitle, notificationOptions);

    return self.registration.showNotification(notificationTitle, notificationOptions)
    .then(() => {
      // Broadcast to all clients (tabs)
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

// new login fresh to test 6767576767