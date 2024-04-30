import { describe, expect, test } from 'vitest';
import state, { contacts } from '@/__test__/__mock__/state.mock';

import { selectById } from './contactSelector';

describe('[CONTACT_SELECTOR] contactSelector Tests', () => {
  test('selectById Correct', () => {
    expect(selectById(state, 2)).toEqual(contacts.data![0]);
  });
  test('selectById Correct', () => {
    expect(selectById(state, 3)).toEqual(contacts.data![1]);
  });
  test('selectById Incorrect', () => {
    expect(selectById(state, 22)).toEqual(null);
  });
});
