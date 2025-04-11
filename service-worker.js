const CACHE_NAME = "rascunho-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/editor.html",
  "/leitura.html",
  "/css/style.css",
  "/js/app.js",
  "/js/editor.js",
  "/js/leitura.js",
  "/js/db.js",
  "/js/exportador.js",
  "/js/progresso.js",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
