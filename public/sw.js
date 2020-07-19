cachedFiles = [
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
      caches.open('static').then(function(cache) {
        return cache.addAll(cachedFiles);
      })
    );
   });
   
   self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
   });