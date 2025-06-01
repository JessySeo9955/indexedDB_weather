class DailyWeather extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <table>
                <thead>
                <tr>
                    <th>123</th>
                    <th>123</th>
                    <th>123</th>
                    <th class="hide-on-mobile">123</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td class="hide-on-mobile">123</td>
                </tr>
                </tbody>
            </table>
        `;
    }
}

export default DailyWeather;