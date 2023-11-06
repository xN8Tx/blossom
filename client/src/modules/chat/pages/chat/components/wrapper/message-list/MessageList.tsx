import { forwardRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../store';
import selectById from '../../../../../store/chatSelector';

import MessageUser from '../message-user/MessageUser';
import MessageCompanion from '../message-companion/MessageCompanion';

import style from './MessageList.module.scss';

const MessageList = forwardRef<HTMLDivElement>((_, ref) => {
  const { id } = useParams();

  const data = useAppSelector((state) => selectById(state, Number(id))!);
  const userId = useAppSelector((state) => state.user.data.id);

  return (
    <div className={style.list} ref={ref}>
      {data.messages?.map((message) => {
        if (Number(message.userId) === Number(userId)) {
          return <MessageUser key={message.id} message={message.message} />;
        }
        return <MessageCompanion key={message.id} message={message.message} />;
      })}
    </div>
  );
});

export default MessageList;
