var cacheName = 'afterschool';
var cacheFiles = [
  'index.html',
  'lessons.js',
  'afterschool.webmanifest',
  'images/biology.png',
  'images/chemistry.png',
  'images/math.png',
  'images/physics.png',
  'images/icon-store-512.png',
  'images/afterschool.png',
  'images/favicon.png',
];

// CACHING THE FILES IN THE SERVICE WORKER [cacheFiles] ARRAY
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install')
    e.waitUntil (caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all files')
      return cache.addAll(cacheFiles)
    }))
  })
  
  // USING THE CACHED FILES
  // self.addEventListener('fetch', function (e) {
  //   e.respondWith(
  //     // check if the cache has the file
  //     caches.match(e.request).then((r) => {
  //       console.log('[Service Worker] Fetching resource: ' + e.request.url)
  //       return r
  //     })
  //   )
  // })
  
  // CACHING NEW FILES
  self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache
      return r || fetch(e.request).then(function (response) {
        // add the new file to cache
        cache.put(e.request, response.clone())
        return response;
      })
    }))
  })