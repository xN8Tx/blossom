import { expect, test } from 'vitest';

import fromDateToTime from './fromDateToTime';

const date = '2014-01-01T10:00:00';

test('isMessageImage Tests', () => {
  expect(fromDateToTime(date)).toBe('10:00');
});
