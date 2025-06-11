// __tests__/main.test.js
import initGeolocation from '../src/utils/geolocation';
import { initAddressAxios, initWeatherAxios } from '../src/utils/api';
import { vi, beforeEach, it, describe, beforeAll, expect } from 'vitest';

vi.mock('../src/utils/geolocation');
vi.mock('../src/utils/api');

// Mock DOM structure before running test
beforeEach(() => {
    document.body.innerHTML = `
        <country-summary id="local-location"></country-summary>
        <country-summary id="seoul-location"></country-summary>
        <hourly-weather id="local-hourly"></hourly-weather>
        <hourly-weather id="seoul-hourly"></hourly-weather>
  `;
});

// Main app logic integration test
describe('Main Initialization Logic', () => {
    beforeAll(() => {
        initGeolocation.mockImplementation(() =>
            Promise.resolve({ latitude: 45.424721, longitude: -75.695000 })
        );

        initWeatherAxios.mockImplementation(() => ({
            summaryWeather: vi.fn(() => {
                return Promise.resolve({"temperature":{"temp":297.16,"feels_like":297.37,"humidity":67.0,"description":"overcast clouds","dt":1749428198,"timezone":32400},"wind":{"speed":1.9,"deg":183.0}})
              }),
            hourlyWeather: vi.fn(() =>
                Promise.resolve([
                    { temperature: { dt: 1710000000 } },
                    { temperature: { dt: 1710003600 } }
                ])
            )
        }));

        initAddressAxios.mockImplementation(() => ({
            locationInfo: vi.fn(() => {
                return Promise.resolve({
                    "address": {
                        "tourism": "Fairmont Château Laurier",
                        "house_number": "1",
                        "road": "Rideau Street",
                        "neighbourhood": "Byward Market",
                        "suburb": "Lowertown",
                        "city_district": "Rideau-Vanier",
                        "city": "Ottawa",
                        "state_district": "Eastern Ontario",
                        "state": "Ontario",
                        "ISO3166-2-lvl4": "CA-ON",
                        "postcode": "K1N 8W5",
                        "country": "Canada",
                        "country_code": "ca"
                    }
                })
            })
        }));
    });

    it('should bind summary and hourly data to DOM', async () => {
        await import('../src/main');
        await new Promise(resolve => setTimeout(resolve, 50)); // wait for async

        const localSummary = document.querySelector('#local-location');
        const localHourly = document.querySelector('#local-hourly');

        expect(localSummary.weather).not.toBeNull()
        expect(Object.keys(localHourly.hourly).length).toBeGreaterThan(0);
    });
});
