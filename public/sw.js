const SW_VERSION = 'v3';

const dbName = 'WeatherDB';
const dbObjectStore = 'weather';
const KEY_PATH_URL = 'url';
const KEY_PATH_DATE = 'date';

console.log("[Service Worker] registered" + SW_VERSION);

self.addEventListener('fetch', async (event) => {

    const url = new URL(event.request.url);
    if (url.host.includes('amazonaws.com')) {
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
    const dateKey = new Date().toISOString().split('T')[0]; // e.g., "2025-06-04"
    const cachedData = await getFromIndexedDB(db, key, dateKey);
    if (cachedData) {
        console.log("[SW] Serving from IndexedDB:", key, dateKey);
        return new Response(JSON.stringify(cachedData), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const response = await fetch(request);
    const data = await response.clone().json();
    await saveToIndexedDB(db, data, key, dateKey);
    return response;
}

function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(dbObjectStore)) {
                const store = db.createObjectStore(dbObjectStore, { keyPath: [KEY_PATH_URL,KEY_PATH_DATE] });
                store.createIndex('url', 'url', { unique: false });
                store.createIndex('date', 'date', { unique: false });
            }
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

function getFromIndexedDB(db, url, date) {
    return new Promise((resolve) => {
        const tx = db.transaction(dbObjectStore, 'readonly');
        const store = tx.objectStore(dbObjectStore);
        const getRequest = store.get([url, date]);

        getRequest.onsuccess = () => resolve(getRequest.result?.data || null);
        getRequest.onerror = () => resolve(null);
    });
}

function saveToIndexedDB(db, data, url, date) {
    return new Promise(resolve => {
        const tx = db.transaction(dbObjectStore, 'readwrite');
        const store = tx.objectStore(dbObjectStore);
        console.log("saveToIndexedDB", {data, url, date} );
        store.put({data, url, date});
        tx.oncomplete = resolve;
    });
}

function deleteFromIndexedDB(db) {
    return new Promise(resolve => {
        const tx = db.transaction(dbObjectStore, 'readwrite');
        const store = tx.objectStore(dbObjectStore);
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
            console.log('[IndexedDB] Weather store cleared');
        };

        clearRequest.onerror = event => {
            console.error('[IndexedDB] Failed to clear store', event);
        };
    })
}
