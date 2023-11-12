import type { ChatWithInfo, Messages } from '../../../models/data';
import type { RootState } from '../../../store';

const selectById = (state: RootState, id: number) => {
  return state.chat.data?.filter((chat) => Number(chat.id) === id)[0];
};

const selectMessage = (
  state: RootState,
  messageId: number,
  chatId: number
): Messages | 0 => {
  if (isNaN(messageId) || isNaN(chatId)) return 0;

  const indexOfChat = state.chat.data!.findIndex(
    (chat) => Number(chat.id) === chatId
  );

  if (indexOfChat === -1) return 0;

  return state.chat.data![indexOfChat!].messages.filter(
    (message) => Number(message.id) === messageId
  )[0];
};

const sortChatsByLastMessageDate = (state: RootState) => {
  function quickSort(list: ChatWithInfo[]): ChatWithInfo[] {
    if (list.length <= 1) {
      return list;
    }

    const pivot = list[list.length - 1];
    const pivotDate = new Date(
      Number(pivot.messages![pivot.messages.length - 1].date)
    );

    const leftList = [];
    const rightList = [];

    for (let i = 0; i < list.length - 1; i++) {
      const date = new Date(
        Number(list[i].messages[list[i].messages.length - 1].date)
      );

      if (date > pivotDate) {
        leftList.push(list[i]);
      } else {
        rightList.push(list[i]);
      }
    }

    return [...quickSort(leftList), pivot, ...quickSort(rightList)];
  }

  return quickSort(state.chat.data!);
};

export default selectById;
export { sortChatsByLastMessageDate, selectMessage };
