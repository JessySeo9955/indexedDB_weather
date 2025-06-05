import TemperatureData from './TemperatureData';
import WindData from './WindData';

export default  class WeatherData {
    constructor({ temperature,  wind }) {
        console.log(temperature);
        console.log(wind);
        this.temperature = new TemperatureData(temperature);
        this.wind = new WindData(wind);
    }
}