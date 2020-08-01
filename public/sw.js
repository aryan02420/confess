const staticCache = 'sc-1';
const dynamicCache = 'dc-1';
const cachedFiles = [
    '/css/style.css',
    '/css/global.css',
    '/js/darkmode.js',
    '/js/get_post.js',
    '/js/get_posts.js',
    '/js/guest_login.js',
    '/js/initialize.js',
    '/js/p5.js',
    '/js/post_comment.js',
    '/js/post_post.js',
    '/js/sketch.js'
  ]

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCache).then(function(cache) {
      return cache.addAll(cachedFiles);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key))
      );
    })
  );
});
   
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      return response || fetch(evt.request);
    })
  );
});