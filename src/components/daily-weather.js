import { isEmptyObject, kelvinToCelsius} from '../utils/commonUtil';

class DailyWeather extends HTMLElement {
    constructor() {
        super();
        this.renderSkeleton();
    }

    set hourly(hours) {
        if (!isEmptyObject(hours)) {
            // {'2020-10-21' : [,,,,], '2020-10-22' : [,], '2020-10-22' : [,,,,]}
            this._hours = hours;
            this.render();
        }
    }

    set reset(message) {
        this.renderSkeleton(message|| "");
    }

    render() {
        const keys = Object.keys(this._hours);
        const maxLength = Math.max(...Object.values(this._hours).map(list => list.length));

        const tableHeader = keys
            .map((k, i) => `<th class="${i === keys.length - 1 ? 'hide-on-mobile' : ''}">${k}</th>`)
            .join('');



        const tableRows = Array.from({ length: maxLength }, (_, i) => {
            const rowCells = keys
                .map((key, j) => {
                    const value = this._hours[key]?.[i]?.temperature?.temp || '';
                    return `<td class="${j === keys.length - 1 ? 'hide-on-mobile' : ''}">${kelvinToCelsius(value)}</td>`;
                })
                .join(''); // (<tr></tr>) * Object.keys(ob).length
            return `<tr>${rowCells}</tr>`;
        }).join('');


        this.innerHTML = `
            <table>
                <thead>
                <tr>
                   ${tableHeader}
                </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        `;
    }

    renderSkeleton(message = "") {
        this.innerHTML = `
            <table class="skeleton" style="height: 500px">
                <tr> ${message}</tr>
            </table>
        `;
    }
}

export default DailyWeather;