import { describe, expect, test } from 'vitest';
import state from '@/__test__/__mock__/state.mock';

import selectByCompanionId from './selectByCompanionId';

describe('[CHAT_SELECTORS] selectByCompanionId Tests', () => {
  test('Correct', () => {
    const res = selectByCompanionId(state, '2');

    expect(res).toEqual(state.chat.data![0]);
  });
  test('Correct', () => {
    const res = selectByCompanionId(state, '3');

    expect(res).toEqual(state.chat.data![1]);
  });
  test('InCorrect', () => {
    const res = selectByCompanionId(state, '5');

    expect(res).toEqual(null);
  });
});
