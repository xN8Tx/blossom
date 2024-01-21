import { MouseEvent, forwardRef, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/store';
import selectById from '@/modules/chat/store/selectors/selectById';

import MenuContext from '@/modules/chat/context/menu/MenuContext';

import MessageWithDate from '../message-with-date/MessageWithDate';
import Message from '../message/Message';

import messageListHelper from '@chat/utils/messageListHelper';

import style from './MessageList.module.scss';

const MessageList = forwardRef<HTMLDivElement>((_, ref) => {
  const { id } = useParams();
  const { setPosX, setPosY, isOpen, setIsOpen, setSelectedMessageId } =
    useContext(MenuContext);

  const data = useAppSelector((state) => selectById(state, Number(id!))!);
  const userId = useAppSelector((state) => state.user.data.id);

  const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isOpen) setIsOpen(true);

    if (document.documentElement.clientWidth > 768) {
      setPosX(event.clientX - 333 + 50);
      setPosY(event.clientY - 90 + 50);
    } else {
      setPosX(event.clientY - 20 + 50);
      setPosY(event.clientY - 90 + 50);
    }

    const id = (event.target as HTMLDivElement).getAttribute('data-id');
    if (typeof id === 'string') {
      setSelectedMessageId(id);
    }
  };

  const onClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setSelectedMessageId('');
    }
  };

  return (
    <div
      onContextMenu={onContextMenu}
      className={style.list}
      onClick={onClick}
      ref={ref}
    >
      {data.messages.map((message, index) => {
        const prevMessage = index === 0 ? null : data.messages[index - 1];
        const message_type = messageListHelper(
          userId!.toString(),
          message,
          prevMessage
        );

        switch (message_type) {
          case 'FIRST_MESSAGE':
            1;
            return (
              <MessageWithDate
                isUser={true}
                isDate={true}
                message={message}
                key={message.id}
              />
            );
          case 'FIRST_MESSAGE_COMP':
            return (
              <MessageWithDate
                isUser={false}
                isDate={true}
                message={message}
                key={message.id}
              />
            );
          case 'NEW_DATE':
            return (
              <MessageWithDate
                isUser={true}
                isDate={true}
                message={message}
                key={message.id}
              />
            );
          case 'NEW_DATE_COMP':
            return (
              <MessageWithDate
                isUser={false}
                isDate={true}
                message={message}
                key={message.id}
              />
            );
          case 'NEW_TIME':
            return (
              <Message
                isUser={true}
                isDate={true}
                messageObj={message}
                key={message.id}
              />
            );
          case 'NEW_TIME_COMP':
            return (
              <Message
                isUser={false}
                isDate={true}
                messageObj={message}
                key={message.id}
              />
            );
          case 'OLD_TIME':
            return (
              <Message
                isUser={true}
                isDate={false}
                messageObj={message}
                key={message.id}
              />
            );
          case 'OLD_TIME_COMP':
            return (
              <Message
                isUser={false}
                isDate={false}
                messageObj={message}
                key={message.id}
              />
            );
        }
      })}
    </div>
  );
});

export default MessageList;
