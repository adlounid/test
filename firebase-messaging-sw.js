importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Samma config som i index.html
firebase.initializeApp({
    apiKey: "AIzaSyBxqE9HSkXGUlujX6x5xcvsz5rPxNCOq44",
    authDomain: "fris-f38da.firebaseapp.com",
    projectId: "fris-f38da",
    messagingSenderId: "1048171458578",
    appId: "1:1048171458578:web:0f77ace7c71f92bded28cb"
});

const messaging = firebase.messaging();

// Hantera bakgrundsnotiser
messaging.onBackgroundMessage(function(payload) {
    console.log('Bakgrundsnotis:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
        data: { url: self.location.origin } // Skickar användaren till startsidan
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Vad händer när man klickar på notisen?
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});