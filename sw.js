// sw.js
const CACHE_NAME = 'zinger-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Direct fetch handling - Zero background delay
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
