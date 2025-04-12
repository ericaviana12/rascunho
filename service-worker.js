const CACHE_NAME = 'escritor-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/painel.html',
  '/livro.html',
  '/configuracoes.html',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/js/bootstrap.bundle.min.js',
  '/js/app.js',
  '/manifest.json',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
