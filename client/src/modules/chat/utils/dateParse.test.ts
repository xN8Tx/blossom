import { test, expect } from 'vitest';

import dateParse from './dateParse';

const date = '2014-01-01T10:00:00';

test('[CHAT_UTILS] dateParse Test', () => {
  expect(dateParse(date)).toEqual({
    localeDate: '01.01.2014',
    localeFullDate: '01.01.2014|10:00',
    localeTime: '10:00',
  });
});
