export default class TemperatureData {
    /**
     *
     * @param temp
     * @param feels_like
     * @param humidity
     * @param description
     * @param dt
     * @param timezone
     */
    constructor({ temp, feels_like, humidity, description, dt, timezone }) {
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.description = description;
        this.dt = dt;
        this.timezone = timezone;
    }
}