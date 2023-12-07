import { describe, expect, test } from 'vitest';
import state from '@/__test__/__mock__/state.mock';

import selectMessageByMessageId from './selectMessageByMessageId';

describe('[CHAT_SELECTORS] selectMessageByMessageId Tests', () => {
  test('Correct', () => {
    const res = selectMessageByMessageId(state, 1, 1);

    expect(res).toEqual(state.chat.data![0].messages[0]);
  });
  test('Correct', () => {
    const res = selectMessageByMessageId(state, 7, 2);

    expect(res).toEqual(state.chat.data![1].messages[0]);
  });
  test('Correct', () => {
    const res = selectMessageByMessageId(state, 13, 3);

    expect(res).toEqual(state.chat.data![2].messages[0]);
  });
  test('Incorrect chatId', () => {
    const res = selectMessageByMessageId(state, 31, 15);

    expect(res).toEqual(null);
  });
  test('Incorrect messageId', () => {
    const res = selectMessageByMessageId(state, 1, 153);

    expect(res).toEqual(null);
  });
});
