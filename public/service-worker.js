// Update this variable manually to a new version when deploying!
const cacheVersion = "1.0"
const cacheName = `BillyCache${cacheVersion}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(["./"]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  let cacheKeeplist = [cacheName];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => {
        return response || fetch(event.request);
      }),
  );
});
