const CACHE_NAME = 'zinger-club-v1';

// Install event: Fast activation without blocking UI
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Instantly activate new service worker
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // Immediately take control of all pages
});

// Fetch event: Network-first approach so installation doesn't hang on caching images
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
