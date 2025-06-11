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
import { formatDate, roundCoords } from './utils/commonUtil';


(async () => {

    // init service worker
    initServiceWorker();

    // coords
    const defaultLocalCoords = {
        latitude: 45.424721, longitude:  -75.695000
    }
    const { latitude, longitude } = await initGeolocation(defaultLocalCoords); // fail -> ottawa
    const seoul = { latitude: roundCoords(37.532600, 1), longitude: roundCoords(127.024612,1) };
    const local = { latitude: roundCoords(latitude, 1), longitude: roundCoords(longitude,1) };

    // init AXIOS
    const weatherAPI = initWeatherAxios(local.latitude, local.longitude);
    const addressAPI = initAddressAxios(latitude, longitude);

    // bind data to Dom
    await Promise.all([
        bindSummaryToDom('#local-location', ...Object.values(local)),
        bindSummaryToDom('#seoul-location', ...Object.values(seoul)),
        bindHourlyToDom('#local-hourly', ...Object.values(local)),
        bindHourlyToDom('#seoul-hourly', ...Object.values(seoul)),
    ]);

    async function bindHourlyToDom(domId, lat, long) {
        const hourly$ = window.document.querySelector(domId);
        try {
            const hourlyList = await weatherAPI.hourlyWeather(lat, long);
            hourly$.hourly = Array.isArray(hourlyList) ? hourlyList.reduce((ob, summary) => {
                // date format
                const dt = summary.temperature.dt;
                const formattedDt = formatDate(dt);
                if (ob?.[formattedDt]) {
                    ob[formattedDt].push(summary);
                } else {
                    ob[formattedDt] = [summary];
                }
                return ob;
            }, {}) : {};
        } catch (e) {
            hourly$.reset = `Reload Again ${e.message}`;
        }
    }

    async function bindSummaryToDom(domId, lat, long) {
        const summary$ = window.document.querySelector(domId);
        try {
            [summary$.place, summary$.weather] = await Promise.all([addressAPI.locationInfo(lat, long), weatherAPI.summaryWeather(lat, long)]);
        } catch (e) {
            summary$.reset = `Reload Again ${e.message}`;
        }

    }
})();



