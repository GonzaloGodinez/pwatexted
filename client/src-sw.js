// Caching js and css requires workbox-strategies to be installed
// To actually respond to requests with a cached response, we need to use a strategy called StalewhileRevalidate
// This startegy will first check the cache for a response, and if it finds one, it will return int.
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Set up asset cache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);
// I am here Jan 10 2024 @ 2:45 AM
// TODO: Implement asset caching
registerRoute();
