import { isEmptyObject, kelvinToCelsius, formatDate } from '../utils/commonUtil';

class CountrySummary extends HTMLElement {

    set place({ address }) {
        if (!isEmptyObject(address)) {
            this._address = {road: address.road, city: address.city, country: address.country};
        }
    }
    set weather(weather) {
        if (!isEmptyObject(weather)) {
            this._weather = weather; // WeatherData
            this._address = this._address || {road: "", city: "", country: ""};
            this.render();
        }
    }

    constructor() {
        super();
        this.renderSkeleton();
    }

    render() {
        this.innerHTML = `
             <span class="text-title">${this._address.city}</span>
             <div class="row">
                 <div class="col child">
                     <div>${formatDate(this._weather.temperature.dt)}</div>
                     <div><span class="text-sub">${this._weather.temperature.description}</span></div>
                 </div>
                 <div class="col child">
                     <div>${kelvinToCelsius(this._weather.temperature.temp)}&deg;</div>
                     <div><span class="text-sub">Feels Like: ${this._weather.temperature.feels_like}°C</span></div>
                     <div><span class="text-sub">Humidity: ${this._weather.temperature.humidity}%</span></div>
                 </div>
                 <div class="child hide-on-mobile">
                     <div>3.1m/s SW</div>
                     <div><span class="text-sub">${this._weather.wind.speed}</span></div>
                 </div>
             </div>
        `;
    }

    renderSkeleton() {
        this.innerHTML = `
             <div class="row ">
                 <div class="col child skeleton">
                     <div>&nbsp;</div>
                     <div><span class="text-sub">&nbsp;</span></div>
                 </div>
                 <div class="col child skeleton">
                     <div>&nbsp;</div>
                     <div><span class="text-sub">&nbsp;</span></div>
                     <div><span class="text-sub">&nbsp;</span></div>
                 </div>
                 <div class="child hide-on-mobile skeleton">
                     <div>&nbsp;</div>
                     <div><span class="text-sub">&nbsp;</span></div>
                     <div><span class="text-sub">&nbsp;</span></div>
                 </div>
             </div>
        `;
    }

}

export default CountrySummary;