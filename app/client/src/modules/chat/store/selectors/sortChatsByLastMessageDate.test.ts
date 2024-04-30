import { test } from 'vitest';
import state from '@/__test__/__mock__/state.mock';

import sortChatsByLastMessageDate from './sortChatsByLastMessageDate';

test('[CHAT_SELECTORS] sortChatsByLastMessageDate correct test', () => {
  const res = sortChatsByLastMessageDate(state);

  const correctChat = state.chat.data!.reverse();

  expect(res).toEqual(correctChat);
});
