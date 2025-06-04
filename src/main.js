// styles
import './styles/theme.css';
import './styles/styles.css';
import './styles/responsive.css';

// initialization
import initGeolocation from './geolocation';
import { initWeatherAxios, initAddressAxios } from './api'
import initServiceWorker from './service_worker';

// components
import './components';
import WeatherData from './data/WeatherData';

(async () => {
    const { coords: { latitude, longitude } } = await initGeolocation();
    const weatherAPI = initWeatherAxios(latitude, longitude);
    const addressAPI = initAddressAxios(latitude, longitude);

    // await weatherAPI.hourlyWeather();

    const userLocationSummary$ =  window.document.querySelector('#user-location');
    userLocationSummary$.place = await addressAPI.locationInfo();
    //console.log("data", await addressAPI.locationInfo());

    const data = await weatherAPI.summaryWeather()

    console.log("data", new WeatherData(data));
    userLocationSummary$.weather = new WeatherData(data);


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

