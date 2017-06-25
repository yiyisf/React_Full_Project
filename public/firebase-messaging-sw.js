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
firebase.messaging();

// messaging.onMessage(function(payload) {
//     console.log("Message received. ", payload);
//     // ...
// });