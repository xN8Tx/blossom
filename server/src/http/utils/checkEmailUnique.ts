import usersAPI from '../../api/usersAPI';

const checkEmailUnique = async (email: string) => {
  const users = await usersAPI.getAllByEmail(email);

  console.log(users);

  if (users!.length !== 0) return false;
  return true;
};

export default checkEmailUnique;
