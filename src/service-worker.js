/* eslint function-paren-newline: [error, consistent] */

import { site } from './constant';

const cacheName = `kyukou-${site.version}`;
const files = ['/', '/app.js'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(files))
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys()
      .then(existingCacheNames => Promise.all(existingCacheNames.map(existingCacheName => {
        if (cacheName === existingCacheName) {
          return Promise.resolve();
        }
        return caches.delete(existingCacheName);
      })))
  );
});

self.addEventListener('fetch', evt => {
  if (evt.request.method === 'GET') {
    evt.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(evt.request))
        .then(res => {
          if (res.ok) {
            return res;
          }
          return Promise.reject(new Error());
        })
        .catch(() => fetch(evt.request))
    );
  }
});
