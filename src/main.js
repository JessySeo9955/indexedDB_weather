// styles
import './styles/theme.css';
import './styles/styles.css';
import './styles/responsive.css';

// initialization
import initGeolocation from './utils/geolocation';
import { initAddressAxios, initWeatherAxios } from './utils/api';
import initServiceWorker from './utils/service_worker';

// components
import './components';

(async () => {

    // init service worker
    initServiceWorker();

    // coords
    const { coords: { latitude, longitude } } = await initGeolocation(); // fail -> ottawa
    const seoul = { latitude: roundCoords(37.532600), longitude: roundCoords(127.024612) };
    const local = { latitude: roundCoords(latitude), longitude: roundCoords(longitude) };

    // init AXIOS
    const weatherAPI = initWeatherAxios(local.latitude, local.longitude);
    const addressAPI = initAddressAxios(latitude, longitude);

    // bind data to Dom
    await bindSummaryToDom('#local-location', ...Object.values(local));
    await bindSummaryToDom('#seoul-location', ...Object.values(seoul));


    async function bindSummaryToDom(id, lat, long) {
        const summary$ = window.document.querySelector(id);
        [summary$.place, summary$.weather] = await Promise.all([addressAPI.locationInfo(lat, long), weatherAPI.summaryWeather(lat, long)]);
    }
})();

function roundCoords(number, decimals = 3) {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

