// service-worker.js – Cache offline para PWA

const CACHE_NAME = "rascunho-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/livro.html",
  "/configuracoes.html",
  "/css/style.css",
  "/js/app.js",
  "/js/livro.js",
  "/js/pdf.js",
  "/js/config.js",
  "/manifest.json",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
