const CACHE_NAME = 'voiceride-v1';
const OFFLINE_URL = '/offline.html';  // Fallback page

const ASSETS = [
  '/',
  '/logo.html',
  '/Bdob.html',
  '/booking.html',
  '/styles/main.css',
  '/scripts/voice.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/offline.html'  // Add offline fallback page
];

// Install Event - Cache Essential Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match(OFFLINE_URL));
    })
  );
});

// Fetch Event - Serve Cached Files When Offline
//self.addEventListener('fetch', (event) => {
  //event.respondWith(
    //fetch(event.request)
      //.catch(() => caches.match(event.request))
      //.then((response) => response || caches.match(OFFLINE_URL))
  //);
//});

// Activate Event - Clean Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
