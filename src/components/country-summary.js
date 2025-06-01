class CountrySummary extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
             <span class="text-title">OTTAWA</span>
             <div class="row">
                 <div class="col child">
                     <div>14:00:00</div>
                     <div><span class="text-sub">Mon 05/22</span></div>
                 </div>
                 <div class="col child">
                     <div>16&deg;</div>
                     <div><span class="text-sub">Feels Like: 18°C</span></div>
                     <div><span class="text-sub">Humidity: 78%</span></div>
                 </div>
                 <div class="child hide-on-mobile">
                     <div>3.1m/s SW</div>
                     <div><span class="text-sub">Overcast clouds</span></div>
                     <div><span class="text-sub">Light breeze</span></div>
                 </div>
             </div>
        `;
    }
}

export default CountrySummary;