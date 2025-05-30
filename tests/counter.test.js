// test/counter.test.js
import { describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import { setupCounter } from '../src/counter';

describe('setupCounter', () => {
    it('increments the button text on click', () => {
        const button = document.createElement('button');
        setupCounter(button);

        fireEvent.click(button);
        expect(button.textContent).toBe('Count is 1');

        fireEvent.click(button);
        expect(button.textContent).toBe('Count is 2');
    });
});
