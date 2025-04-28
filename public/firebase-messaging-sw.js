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
  
  // Handle chat notification (type 2) - different origin
  if (event.notification.data && event.notification.data.type === "2") {
    const chatUrl = new URL('https://meuat.kaam.com/jobseeker/inbox');
    chatUrl.searchParams.append('admin_id', event.notification.data.to_id || '');
    chatUrl.searchParams.append('token', event.notification.data.to_token || event.notification.data.to_user_token || '');
    chatUrl.searchParams.append('user_id', event.notification.data.from_id || '');
    chatUrl.searchParams.append('user_name', event.notification.data.from_user_name || '');
    chatUrl.searchParams.append('user_photo_url', event.notification.data.from_photo_url || '');
    chatUrl.searchParams.append('profile_img', event.notification.data.to_photo_url || event.notification.data.to_user_photo_url || '');

    event.waitUntil(
      // Focus existing chat window if available
      self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then((clientList) => {
        // Find any existing chat window (matching the chat origin)
        const chatClient = clientList.find(client => 
          client.url.startsWith('https://meuat.kaam.com/')
        );

        if (chatClient) {
          // Focus existing chat window
          return chatClient.focus().then(() => {
            // Optionally navigate to specific chat if needed
            if (!chatClient.url.includes('/jobseeker/inbox')) {
              return chatClient.navigate(chatUrl.toString());
            }
          });
        }
        
        // Open new chat window if none exists
        return self.clients.openWindow(chatUrl.toString());
      })
    );
  }
  // Handle other notification types (same origin)
  else {
    let url = '/'; // Default URL
    
    // Handle job detail notification (type 3)
    if (event.notification.data && event.notification.data.type === "3" && event.notification.data.job_id) {
      url = `/jobs/detail/${event.notification.data.job_id}`;
    }

    event.waitUntil(
      self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then((clientList) => {
        // Check for existing app tabs (same origin)
        const appClient = clientList.find(client => 
          client.url.includes(self.location.origin)
        );

        if (appClient) {
          return appClient.focus().then(() => {
            if (url !== '/' && !appClient.url.includes(url)) {
              return appClient.navigate(url);
            }
          });
        }
        
        // Open new tab in app origin
        return self.clients.openWindow(new URL(url, self.location.origin).toString());
      })
    );
  }
});

messaging.onBackgroundMessage((payload) => {
  try {
    if (!payload) {
      console.error('Payload is undefined');
      return;
    }
    
    console.error('Payload:', payload);
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

// chat notification data 

      // attachment_type: '0',
      // user_type: '',
      // attachment: '',
      // insert_id: '1190',
      // from_id: '499',
      // company_name: 'Capgemini',
      // text: 'share cv',
      // to_id: '17',
      // type: '2',
      // title: 'jyoti has sent you a message.',
      // channel: '5z26Q9Id7zYlAhRD6gdU3g==',
      // company_logo: '',
      // created_date: '15:07 pm',
      // company_location: 'Mumbai',
      // from_user_name: 'jyoti',
      // from_photo_url: ''