const CACHE = "mn-v1";
const URLS = ["./", "./index.html", "./CNAME"];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)));
  self.skipWaiting();
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==CACHE&&caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("./")))
  );
});
