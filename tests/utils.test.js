import { describe, it, expect } from 'vitest';
// import { fireEvent } from '@testing-library/dom';

import { roundCoords, formatDate, kelvinToCelsius} from '../src/utils/commonUtil';

describe('roundCoords', () => {
    it('rounds to 3 decimals', () => {
        expect(roundCoords(45.424721)).toBe(45.425);
    });

    it('rounds to 2 decimals', () => {
        expect(roundCoords(45.424721, 2)).toBe(45.42);
    });
});

describe('formatDate', () => {
    it('formats to "YYYY-mm-dd"', () => {
        const unixSeconds = Math.floor(Date.now() / 1000);
        expect(formatDate(unixSeconds)).toBe('2025-06-08');
    });
});

describe('kelvinToCelsius', () => {
    it('changes to Celsius', () => {
        expect(kelvinToCelsius(300,2)).toBe("26.85");
        expect(kelvinToCelsius(273.15, 0)).toBe("0");
    });
});

