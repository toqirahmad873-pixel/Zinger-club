// sw.js
const CACHE_NAME = 'zinger-club-v2';

// Sirf zaroori files cache hongi taake install hone me bilkul time na lage
const STATIC_ASSETS = [
  '/',
  '/manifest-v2.json',
  'https://i.postimg.cc/qvnF1k3t/Zinger.png'
];

// Fast Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Doosre pending scripts ka wait kiye bina instant install karega
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Network-first strategy for menu assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
