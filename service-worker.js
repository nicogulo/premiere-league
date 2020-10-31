importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/nav.html", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/icon.png", revision: '1' },
    { url: "/icon-144x144.png", revision: '1' },
    { url: "/icon-192x192.png", revision: '1' },
    { url: "/icon-256x256.png", revision: '1' },
    { url: "/icon-384x384.png", revision: '1' },
    { url: "/icon-512x512.png", revision: '1' },
    { url: "/bg.jpg", revision: '1' },
    { url: "/pages/score.html", revision: '1' },
    { url: "/pages/team.html", revision: '1' },
    { url: "/pages/favorit.html", revision: '1' },
    { url: "/pages/about.html", revision: '1' },
    { url: "/css/materialize.min.css", revision: '1' },
    { url: "/css/style.css", revision: '1' },
    { url: "/js/materialize.min.js", revision: '1' },
    { url: "/js/nav.js", revision: '1' },
    { url: "/js/api.js", revision: '1' },
    { url: "/js/idb.js", revision: '1' },
    { url: "/js/req.js", revision: '1' },
    { url: "/js/script.js", revision: '1' }
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });
  workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "api",
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}



self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});