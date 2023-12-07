import type { Messages } from '@/models/data';
import type { RootState } from '@/store';

const selectMessageByMessageId = (
  state: RootState,
  messageId: number,
  chatId: number
): Messages | null => {
  if (isNaN(messageId) || isNaN(chatId)) return null;

  const indexOfChat = state.chat.data!.findIndex(
    (chat) => Number(chat.id) === Number(chatId)
  );

  if (indexOfChat === -1) return null;

  const message = state.chat.data![indexOfChat!].messages.find(
    (message) => Number(message.id) === Number(messageId)
  );

  if (message) return message;
  return null;
};

export default selectMessageByMessageId;
