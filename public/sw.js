const SW_VERSION = 'v3';

const dbName = 'WeatherDB';
const dbObjectStore = 'weather';
const keyPath = 'url';

console.log("[Service Worker] registered" + SW_VERSION);

self.addEventListener('fetch', async (event) => {

    const url = new URL(event.request.url);
    if (url.host.includes('amazonaws.com') && event.request.method === 'POST') {

        event.respondWith((async () => {
            const clonedRequest = event.request.clone();
            const requestBody = await clonedRequest.json();
            return handleWeatherRequest(event.request, requestBody.api);
        })());
    }
});

async function handleWeatherRequest(request, weatherApiAddress) {
    const db = await openIndexedDB();
    const key = weatherApiAddress;
    const cachedData = await getFromIndexedDB(db, key);
    if (cachedData) {
        console.log("[SW] Serving from IndexedDB:", key);
        return new Response(JSON.stringify(cachedData), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const response = await fetch(request);
    const data = await response.clone().json();
    await saveToIndexedDB(db, key, data);
    return response;
}

function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(dbObjectStore)) {
                db.createObjectStore(dbObjectStore, { keyPath });
            }
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

function getFromIndexedDB(db, url) {
    return new Promise((resolve) => {
        const tx = db.transaction(dbObjectStore, 'readonly');
        const store = tx.objectStore(dbObjectStore);
        const getRequest = store.get(url);

        getRequest.onsuccess = () => resolve(getRequest.result?.data || null);
        getRequest.onerror = () => resolve(null);
    });
}

function saveToIndexedDB(db, url, data) {
    return new Promise(resolve => {
        const tx = db.transaction(dbObjectStore, 'readwrite');
        const store = tx.objectStore(dbObjectStore);
        store.put({ url, data });
        tx.oncomplete = resolve;
    });
}
