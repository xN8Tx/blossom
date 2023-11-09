import Wrapper from './wrapper/Wrapper';
import Time from './time/Time';

import type { Messages } from '../../../../../../../models/data';
import type { MouseEvent } from 'react';

import style from './Message.module.scss';

type MessageProps = {
  isDate: boolean;
  isUser: boolean;
  messageObj: Messages;
};

export default function Message({ isDate, isUser, messageObj }: MessageProps) {
  const { message, date, status, isEdit } = messageObj;

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={style.container}
      is-user={isUser.toString()}
      onContextMenu={onClick}
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
}
