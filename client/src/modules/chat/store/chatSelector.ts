import { RootState } from '../../../store';

const selectById = (state: RootState, id: number) => {
  return state.chat.data?.filter((chat) => Number(chat.id) === id)[0];
};

export default selectById;
