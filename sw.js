const CACHE = 'uriban-v4';
const CORE = [
  '/class-store/',
  '/class-store/index.html',
  'https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Jua&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.url.includes('firebasedatabase') || e.request.url.includes('googleapis.com/identitytoolkit')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
