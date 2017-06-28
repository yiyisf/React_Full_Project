/**
 * Created by liuzhe on 2017/6/25.
 */
importScripts('https://www.gstatic.com/firebasejs/3.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: '844858131123'
});
const messaging = firebase.messaging();


messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    // ...
});

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});