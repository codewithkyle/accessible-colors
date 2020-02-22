const offlineCacheFiles = ['/', '/index.html', '/assets/app.js'];
const offlineCache = 'v1';

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(offlineCache).then(cache => {
            return cache.addAll(offlineCacheFiles);
        })
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== offlineCache) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            return fetch(event.request, {
                redirect: 'follow',
            }).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(offlineCache).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});
