import api from './api';
import './styles/styles.css';

 // register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('[SW] Registered with scope:', reg.scope);
            })
            .catch(err => {
                console.error('[SW] Registration failed:', err);
            });
    });
}