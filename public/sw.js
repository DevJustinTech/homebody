// A small offline cache. There is no build plugin and no hidden magic: the
// app shell is cached on install, then every same-origin asset is cached the
// first time it is fetched. Navigation is network-first so a new deploy is
// picked up, with the cached shell as the offline fallback.
const CACHE = 'homebody-v1'
const SHELL = ['./', './index.html', './favicon.svg', './manifest.webmanifest', './icon-192.png', './icon-512.png']

// The baked 3D demonstrations are enhancement assets: cache what is there,
// but never fail the install because one clip is missing.
const CLIPS = [
  'pushup', 'jumpingJack', 'jog', 'shadowBox',
].flatMap(id => ['light', 'dark'].flatMap(theme => [
  `./anim3d/clips/${id}-${theme}.webp`,
  `./anim3d/clips/${id}-still-${theme}.webp`,
]))

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache =>
        Promise.all([
          cache.addAll(SHELL),
          Promise.allSettled(CLIPS.map(path => cache.add(path))),
        ]),
      )
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone()
          caches.open(CACHE).then(cache => cache.put('./index.html', copy))
          return response
        })
        .catch(() => caches.match('./index.html')),
    )
    return
  }

  event.respondWith(
    caches.match(request).then(hit => {
      if (hit) return hit
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE).then(cache => cache.put(request, copy))
        }
        return response
      })
    }),
  )
})
