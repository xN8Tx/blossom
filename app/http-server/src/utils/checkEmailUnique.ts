import CustomFetch from '../services/fetch/customFetch.api';

import type { UsersDB } from '../typings/database';

const databaseFetch = new CustomFetch('database');

const checkEmailUnique = async (email: string) => {
  const users = await databaseFetch.get<UsersDB[]>(`/users/email/${email}`);

  if (users && users.length !== 0) return false;
  return true;
};

export default checkEmailUnique;
