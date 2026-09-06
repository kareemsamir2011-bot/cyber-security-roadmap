const C="cyber-roadmap-v29";
const A=[];
self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin===location.origin)e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match(e.request)));});
