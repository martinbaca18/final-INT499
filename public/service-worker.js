import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';


precacheAndRoute(self.__WB_MANIFEST);


registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst()
);
