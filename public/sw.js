let ver = '230320';
fetch('/api')
  .then(response => response.json())
  .then(data => {
    console.log(data.ver);
  })

const cachedFiles = [
    '/css/style.css',
    '/css/global.css',
    '/images/48.png',
    '/images/96.png',
    '/images/128.png',
    '/images/144.png',
    '/images/256.png',
    '/images/360.png',
    '/images/480.png',
    '/images/512.png',
    '/js/darkmode.js',
    '/js/get_post.js',
    '/js/get_posts.js',
    '/js/guest_login.js',
    '/js/initialize.js',
    '/js/p5.js',
    '/js/post_comment.js',
    '/js/post_post.js',
    '/js/post_vote.js',
    '/js/sketch.js',
    '/manifest.webmanifest'
  ]

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open('cache-'+ver).then((cache) => {
      return cache.addAll(cachedFiles);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== ('cache-'+ver))
        .map(key => caches.delete(key))
      );
    })
  );
});
   
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request);
    })
  );
});