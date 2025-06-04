import TemperatureData from './TemperatureData';
import WindData from './WindData';

export default  class WeatherData {
    constructor({ temperature,  wind }) {
        this.temperature = new TemperatureData(temperature);
        this.wind = new WindData(wind);
    }
}