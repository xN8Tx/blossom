import { expect, test, describe } from 'vitest';

import isMessageImage from './isMessageImage';

const correctMessage = 'data:image/webp;base64dsadsa';
const incorrectMessage = 'dsadsa';

describe('[CHAT_UTILS] isMessageImage Tests', () => {
  test('Correct message', () => {
    expect(isMessageImage(correctMessage)).toBe(true);
  });
  test('Incorrect message', () => {
    expect(isMessageImage(incorrectMessage)).toBe(false);
  });
});
