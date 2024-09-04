// src/service-worker.js

const CACHE_NAME = 'streamlist-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js', // Add other assets as needed
    '/static/css/main.css',  // Adjust paths based on your build setup
];

// Install event - Cache resources
this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    console.log('Service Worker installing.');
});

// Activate event - Clean up old caches
this.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.forEach(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('Service Worker activating.');
});


// Fetch event - Serve cached resources
this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return the cached resource
                }
                return fetch(event.request); // Fetch from network if not in cache
            })
    );
    console.log('Fetching:', event.request.url);
});
