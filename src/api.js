import axios from 'axios';

function initAxios(latitude, longitude) {
    const api = axios.create({
        baseURL: 'https://itcurv9da5.execute-api.us-east-2.amazonaws.com',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use(config => {
        // default params
        config.params = { latitude, longitude, ...config.params };
        return config;
    });

    api.interceptors.response.use(config => {
        return config.data;
    }, (err) => {
        return Promise.reject(err);
    });

    async function hourlyWeather() {
        return await api.post('/', { api: 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=45.424721&lon=-75.695000' }, {
            headers: {
                'x-api-key': 'mcmB2BJuGu4FpNcbpborD5QUxP3R10g73UjZfjX5',
            },
        });
    }


    async function summaryWeather() {
        return await api.get('https://api.openweathermap.org/data/2.5/weather');
    }

    return { hourlyWeather, summaryWeather };
}


export default initAxios;
