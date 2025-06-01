// styles
import './styles/theme.css';
import './styles/styles.css';
import './styles/responsive.css';

// initialization
import initGeolocation from './geolocation';
import initAxios from './api'
import initServiceWorker from './init_sw';

// components
import CountrySummary from './components/country-summary';
import DailyWeather from './components/daily-weather';

const {coords: {latitude, longitude}} = await initGeolocation();
const api = initAxios(latitude, longitude);

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

customElements.define('country-summary', CountrySummary);
customElements.define('daily-weather', DailyWeather);