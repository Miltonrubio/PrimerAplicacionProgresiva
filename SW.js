var cacheName='appV1';
var contenidoCache=['index.html', 'app.js', 'sw.js','manifest.webmanifest','bootstrap/css/bootstrap.css', 'bootstrap/js/bootstrap.min.js']

self.addEventListener('install',(e)=>{
console.log("Instalado")
e.waitUntil(async()=>{
    const cache=await caches.open(cacheName);
    await cache.addAll(contenidoCache);
})
});


self.addEventListener('fetch',(e)=>{
    e.respondWith((async()=>{
        const r= await caches.match(e.request);
        if (r) return r;
        const response= await fetch(e.request);
        const cache=await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    }))
});