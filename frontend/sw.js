const STATIC_CACHE = "carnecerta-static-v2";
const DATA_CACHE = "carnecerta-data-v2";
const OFFLINE_CACHE = "carnecerta-offline-v2";
const OFFLINE_PAGE = "./index.html";
const CARNES_DATA_URL = "./data/carnes.json";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/categorias.css",
  "./script.js",
  "./data/carnes.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, DATA_CACHE, OFFLINE_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || networkPromise;
};

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return caches.match(OFFLINE_PAGE);
  }
};

const networkFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return caches.match(OFFLINE_PAGE);
  }
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (!isSameOrigin) {
    return;
  }

  if (requestUrl.pathname.endsWith("/data/carnes.json") || requestUrl.pathname.endsWith("/data/carnes.json".replace("/", ""))) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  if (requestUrl.pathname.endsWith("/script.js")) {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  if (requestUrl.pathname.includes("/paginas/categorias/") || requestUrl.pathname.includes("/paginas/acessibilidade/")) {
    event.respondWith(networkFirst(request, OFFLINE_CACHE));
    return;
  }

  event.respondWith(
    cacheFirst(request, STATIC_CACHE)
  );
});
