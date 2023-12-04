import { expect, test, describe } from 'vitest';

import isMessageEmpty from './isMessageEmpty';

const correctMessage = 'hello world!';
const incorrectMessage = '   ';

describe('isMessageEmpty Tests', () => {
  test('Correct message', () => {
    expect(isMessageEmpty(correctMessage)).toBe(false);
  });
  test('Incorrect message', () => {
    expect(isMessageEmpty(incorrectMessage)).toBe(true);
  });
});
