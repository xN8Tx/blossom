import { describe, expect, test } from 'vitest';
import state, { users } from '@/__test__/__mock__/state.mock';

import { selectWithoutUser } from './usersSelector';

const usersWithoutUser = users.data?.slice(1);

describe('[USERS_SELECTOR] userSelector Tests', () => {
  test('selectWithoutUser Correct', () => {
    expect(selectWithoutUser(state)).toEqual(usersWithoutUser);
  });
});
