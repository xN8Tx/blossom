import { expect, test, describe } from 'vitest';

import decodeJWT from './decodeJwt';

const correctToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
const incorrectToken = `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

describe('DecodeJWT Tests', () => {
  test('Correct decode', () => {
    expect(decodeJWT(correctToken)).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
  });
  test('Incorrect decode', () => {
    expect(decodeJWT(incorrectToken)).toBe(false);
  });
});
