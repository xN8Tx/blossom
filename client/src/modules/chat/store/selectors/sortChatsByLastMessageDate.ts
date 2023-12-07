import type { ChatWithInfo } from '@/models/data';
import type { RootState } from '@/store';

const sortChatsByLastMessageDate = (state: RootState) => {
  function quickSort(list: ChatWithInfo[]): ChatWithInfo[] {
    if (list.length <= 1) {
      return list;
    }

    const pivot = list[list.length - 1];

    if (pivot.messages.length > 0) {
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
    } else {
      const rightList = [];

      for (let i = 0; i < list.length - 1; i++) {
        rightList.push(list[i]);
      }

      return [pivot, ...quickSort(rightList)];
    }
  }

  return quickSort(state.chat.data!);
};

export default sortChatsByLastMessageDate;
