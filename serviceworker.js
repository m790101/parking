const CACHE_NAME = 'parking-version-1'
const urlToCaches = ['index.html','offline.html']



this.addEventListener(('install'),(e)=>{
e.waitUntil(
    caches.open(CACHE_NAME)
    .then((caches)=>{
        console.log('open cache')
        return caches.addAll(urlToCaches)
    })
)   
})

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((res) => {
                if(res === undefined) return 
                return res || fetch(e.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});


this.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    console.log('active')
    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});