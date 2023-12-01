import { memo } from 'react';

import Wrapper from './wrapper/Wrapper';
import Time from './time/Time';

import type { Messages } from '@/models/data';

import style from './Message.module.scss';

type MessageProps = {
  isDate: boolean;
  isUser: boolean;
  messageObj: Messages;
};

const Message = memo(({ isDate, isUser, messageObj }: MessageProps) => {
  const { id, message, date, status, isEdit } = messageObj;

  return (
    <div
      className={style.container}
      is-user={isUser.toString()}
      data-id={id}
      is-active='false'
    >
      {isDate && <Time date={date} />}
      <Wrapper
        isDate={isDate}
        isEdit={isEdit}
        isUser={isUser}
        status={status}
        message={message}
      />
    </div>
  );
});

export default Message;
