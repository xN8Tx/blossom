import { memo } from 'react';

import Wrapper from './wrapper/Wrapper';
import Time from './time/Time';
import File from './file/File';
import Image from './image/Image';

import type { Messages } from '@/models/data';

import style from './Message.module.scss';
import Video from './video/Video';

type MessageProps = {
  isDate: boolean;
  isUser: boolean;
  messageObj: Messages;
};

const Message = memo(({ isDate, isUser, messageObj }: MessageProps) => {
  const { id, message, date, status, isEdit, type } = messageObj;

  return (
    <div
      className={style.container}
      is-user={isUser.toString()}
      data-id={id.toString()}
      is-active='false'
    >
      {isDate && <Time date={date} />}
      {type === 'image' && <Image message={message} />}
      {type === 'video' && <Video messageObj={messageObj} />}
      {type === 'file' && <File messageObj={messageObj} isUser={isUser} />}
      {!type && (
        <Wrapper
          isDate={isDate}
          isEdit={isEdit}
          isUser={isUser}
          status={status}
          message={message}
        />
      )}
    </div>
  );
});

export default Message;
