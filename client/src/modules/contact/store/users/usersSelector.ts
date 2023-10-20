import { RootState } from '../../../../store';

const selectWithoutUser = (state: RootState) => {
  return state.users.data?.filter((user) => user.id != state.user.data.id);
};

export { selectWithoutUser };
