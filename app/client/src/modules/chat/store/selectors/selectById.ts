import type { RootState } from '@/store';

const selectById = (state: RootState, id: number) => {
  const chat = state.chat.data?.find((chat) => Number(chat.id) === id);

  if (chat) return chat;
  return null;
};

export default selectById;
