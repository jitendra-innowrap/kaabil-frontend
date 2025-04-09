importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAIqXfvZeuOBKdgWLCxKZNAXUykd4lj6tA",
  authDomain: "missioneven-4eef9.firebaseapp.com",
  projectId: "missioneven-4eef9",
  storageBucket: "missioneven-4eef9.firebasestorage.app",
  messagingSenderId: "538215499239",
  appId: "1:538215499239:web:7374b5317555ef70a1e942",
  measurementId: "G-ZWEFY9NVKP",
  vapidKey: "BNm5SMwUgJdDbWY4Lbmcss6fbV_2r8NhlRtuQDQwussqdiu7-_jsGc3ojBBXgdcZd7U7P-gQqJQRUxvVTV84BWk"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
