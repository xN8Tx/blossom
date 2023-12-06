import { Messages } from '@/models/data';
import dateParse from './dateParse';

type MessageListHelper =
  | 'FIRST_MESSAGE'
  | 'FIRST_MESSAGE_COMP'
  | 'NEW_DATE'
  | 'NEW_DATE_COMP'
  | 'NEW_TIME'
  | 'NEW_TIME_COMP'
  | 'OLD_TIME'
  | 'OLD_TIME_COMP';

const messageListHelper = (
  userId: string,
  message: Messages,
  prevMessage: Messages | null
): MessageListHelper => {
  const isMessageFromUser = Number(message.userId) === Number(userId);

  /* prettier-ignore */
  const { 
    localeDate: messageDate, // 6.11.2023 - format
    localeTime: messageTime  // 16:45 - format
  } = dateParse(message.date);

  if (!prevMessage && isMessageFromUser) return 'FIRST_MESSAGE';
  if (!prevMessage && !isMessageFromUser) return 'FIRST_MESSAGE_COMP';

  /* prettier-ignore */
  const {
    localeDate: prevMessageDate,
    localeTime: prevMessageTime,
  } = dateParse(prevMessage!.date);

  /* prettier-ignore */
  const isBothMesFromOneUser = Number(message.userId) === Number(prevMessage!.userId);
  const isNewDate = messageDate !== prevMessageDate;
  const isNewTime = messageTime !== prevMessageTime;

  // FROM USER
  if (isMessageFromUser && isNewDate) return 'NEW_DATE';
  if (isMessageFromUser && isNewTime) return 'NEW_TIME';
  if (isMessageFromUser && !isBothMesFromOneUser) return 'NEW_TIME';
  if (isMessageFromUser && isBothMesFromOneUser) return 'OLD_TIME';

  // FROM COMP
  if (!isMessageFromUser && isNewDate) return 'NEW_DATE_COMP';
  if (!isMessageFromUser && isNewTime) return 'NEW_TIME_COMP';
  if (!isMessageFromUser && !isBothMesFromOneUser) return 'NEW_TIME_COMP';
  if (!isMessageFromUser && isBothMesFromOneUser) return 'OLD_TIME_COMP';

  //  NEW MESSAGES
  return 'NEW_TIME';
};

export default messageListHelper;
