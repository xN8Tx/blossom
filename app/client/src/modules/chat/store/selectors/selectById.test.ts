import { describe, expect, test } from 'vitest';
import state from '@/__test__/__mock__/state.mock';

import selectById from './selectById';

describe('[CHAT_SELECTORS] selectById Tests', () => {
  test('Correct', () => {
    const res = selectById(state, 1);

    expect(res).toEqual(state.chat.data![0]);
  });
  test('Correct', () => {
    const res = selectById(state, 2);

    expect(res).toEqual(state.chat.data![1]);
  });
  test('InCorrect', () => {
    const res = selectById(state, 5);

    expect(res).toEqual(null);
  });
});
