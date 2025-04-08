importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBZXmPayrr5GQp0GeI99wmd82w6fxl6BzY",
  authDomain: "kaabil-87339.firebaseapp.com",
  projectId: "kaabil-87339",
  storageBucket: "kaabil-87339.firebasestorage.app",
  messagingSenderId: "972940526001",
  appId: "1:972940526001:web:6e626a2faa3122c382bd90",
  vapidKey: "BBAAt4cFYf-wqtm786_CTLMIp3GBqPHByoIxDCIugCLy-6XCSW3JOEK6LeqNS8HvcyEo7P9M7p2LNSqgQG2yoTU"
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
