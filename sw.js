import { precaching } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precaching.precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.href.startsWith(self.location.origin + '/documents'),
  new StaleWhileRevalidate({
    cacheName: 'documents-cache',
  })
);

self.addEventListener('fetch', (event) => {
  console.log(`Fetching: ${event.request.url}`);
});