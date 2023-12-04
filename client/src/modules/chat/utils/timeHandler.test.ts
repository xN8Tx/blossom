import { expect, test, describe } from 'vitest';

import timeHandler from './timeHandler';

const addZeroToHour = '1701465622756'; // 4.20
const fullTime = '1700304979236'; // 17.56

describe('isMessageImage Tests', () => {
  test('Add zero to hour', () => {
    expect(timeHandler(addZeroToHour)).toBe('04:20');
  });
  test('Full time', () => {
    expect(timeHandler(fullTime)).toBe('17:56');
  });
});
