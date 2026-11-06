'use strict';
// Change VERSION whenever any local asset or event/course data changes.
const VERSION = 'v1';
// Namespace includes the mount path, so two subpath previews do not clear each other's cache.
const PREFIX = `traditions-pwa-${encodeURIComponent(new URL('./', self.location).pathname)}-`;
const CACHE = PREFIX + VERSION;
const FILES = [
  './index.html', './style.css', './app.js', './courses.json', './events.json',
  './manifest.webmanifest', './service-worker.js',
  './assets/logo-white-full.png', './assets/logo.png', './assets/logo-navy.png',
  './assets/icon-192.png', './assets/icon-512.png', './assets/apple-touch-icon.png',
  './assets/riverside-river.webp', './assets/playfair-display.ttf'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    // The bundled Playfair font remains available offline even if Google is unreachable.
    if (url.origin === 'https://fonts.googleapis.com') {
      event.respondWith(fetch(event.request).catch(() => new Response('', {headers: {'Content-Type': 'text/css'}})));
    }
    return;
  }
  if (!url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (event.request.mode === 'navigate') {
      try { return await fetch(event.request); }
      catch { return (await cache.match('./index.html')) || Response.error(); }
    }
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch { return Response.error(); }
  })());
});
