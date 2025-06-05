function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', activateWorker, { once: true });
    }
}

function activateWorker() {
    navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
            console.log('[SW] Registered with scope:', reg.scope);
        })
        .catch((err) => {
            console.error('[SW] Registration failed:', err);
        });
}

export default initServiceWorker;