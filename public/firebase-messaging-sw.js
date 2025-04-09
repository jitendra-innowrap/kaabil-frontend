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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Add a global error handler
self.addEventListener('error', (event) => {
  console.error('Service Worker Error:', event.error);
});

messaging.onBackgroundMessage((payload) => {
  try {
    console.log('Full payload:', JSON.stringify(payload));
    
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
      icon: payload.notification?.icon || payload.data?.company_logo || payload?.icon,
      data: payload.data || {} // Pass all data to the notification
    };

    console.log('Preparing notification:', notificationTitle, notificationOptions);

    return self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error('Error in background message handler:', error);
  }
});