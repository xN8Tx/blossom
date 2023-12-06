import MessageDate from '../message-date/MessageDate';
import Message from '../message/Message';

import type { Messages } from '@/models/data';

type MessageWithDateProps = {
  message: Messages;
  isUser: boolean;
  isDate: boolean;
};

export default function MessageWithDate({
  message,
  isUser,
  isDate,
}: MessageWithDateProps) {
  return (
    <>
      <MessageDate date={message.date} />
      <Message isUser={isUser} isDate={isDate} messageObj={message} />
    </>
  );
}
