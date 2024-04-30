import { RootState } from '@/store';

const selectWithoutUser = (state: RootState) => {
  return state.users.data?.filter(
    (user) => Number(user.id) != Number(state.user.data.id)
  );
};

export { selectWithoutUser };
