import axios from 'axios';
import WeatherData from './data/WeatherData';


function createAxios(baseUrl) {
    const api = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
    });

    api.interceptors.request.use(config => {
        config.headers = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
        return config;
    });

    return api;

}

function initAddressAxios(lat, lon) {
    const api = createAxios('https://nominatim.openstreetmap.org');

    api.interceptors.request.use(config => {
        config.params = { lat, lon, ...config.params };
        return config;
    });

    api.interceptors.response.use(config => {
        return config.data;
    }, (err) => {
        return Promise.reject(err);
    });

    async function locationInfo() {
        return api.get('/reverse', { params: {format: 'json'}});
    }

    return { locationInfo };
}

function initWeatherAxios(lat, lon) {
    const api = createAxios('https://itcurv9da5.execute-api.us-east-2.amazonaws.com');

    api.interceptors.request.use(config => {
        config.headers = {
            'x-api-key': 'mcmB2BJuGu4FpNcbpborD5QUxP3R10g73UjZfjX5', ...config.headers,
        };
        return config;
    });

    api.interceptors.response.use(config => {
        return config.data.data;
    }, (err) => {
        return Promise.reject(err);
    });

    async function hourlyWeather() {
        return api.post('/', { api: `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}`, type: 'hours' });
    }


    async function summaryWeather() {
        return api.post('/', { api: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` , type: 'summary'});
    }

    return { hourlyWeather, summaryWeather };
}

export { initWeatherAxios, initAddressAxios };
