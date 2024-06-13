const cacheName = "DefaultCompany-WestRacing-1.00";
const contentToCache = [
"Build/EW3Q35U68RVG5UG.loader.js,",
"Build/0599HA7A1V7LDAJ.framework.js.unityweb",
"Build/0599HA7A1V7LDAJ.data.unityweb",
"Build/0599HA7A1V7LDAJ.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
