// styles
import './styles/theme.css';
import './styles/styles.css';
import './styles/responsive.css';

// initialization
import initGeolocation from './geolocation';
import { initAddressAxios, initWeatherAxios } from './api';
import initServiceWorker from './service_worker';

// components
import './components';
import WeatherData from './data/WeatherData';

(async () => {

    initServiceWorker();
    // user location
    // fail -> ottawa
    const { coords: { latitude, longitude } } = await initGeolocation();
    const weatherAPI = initWeatherAxios(latitude, longitude);
    const addressAPI = initAddressAxios(latitude, longitude);

    // await weatherAPI.hourlyWeather();

    const userLocationSummary$ = window.document.querySelector('#user-location');
    const data = await weatherAPI.summaryWeather();

    userLocationSummary$.place = await addressAPI.locationInfo();
    userLocationSummary$.weather = new WeatherData(data);


    // seoul location
    // South Korea is 37.532600, and the longitude is 127.024612

})();


// const App = defineComponent({
//     components: { CountrySummary },
//     template: `<country-summary />`
// })
// createApp(App).mount('#app');

// register service worker
// initServiceWorker();
// await api.hourlyWeather();
//  [hourly, summary] = await Promise.all([hourlyWeather(), summaryWeather()]);
// console.log(hourly, summary)

