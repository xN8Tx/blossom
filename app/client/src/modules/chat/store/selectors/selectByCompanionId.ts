import type { RootState } from '@/store';

const selectByCompanionId = (state: RootState, userId: string) => {
  const chat = state.chat.data?.find(
    (chat) => Number(chat.user.id) === Number(userId)
  );

  if (chat) return chat;
  return null;
};

export default selectByCompanionId;
