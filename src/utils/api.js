import axios from 'axios';

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

    api.interceptors.response.use(config => {
        return config.data;
    }, (err) => {
        return Promise.reject(err);
    });

    function locationInfo(latitude = lat, longitude = lon) {
        return api.get('/reverse', { params: {format: 'json', lat: latitude, lon: longitude}});
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
        return JSON.parse(config?.data?.data || "{}");
    }, (err) => {
        return Promise.resolve(err);
    });

    function hourlyWeather(latitude = lat, longitude = lon) {
        return api.post('/', { api: `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}`, type: 'hours' });
    }


     function summaryWeather(latitude = lat, longitude = lon) {
        return api.post('/', { api: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}` , type: 'summary'});
    }

    return { hourlyWeather, summaryWeather };
}

export { initWeatherAxios, initAddressAxios };
