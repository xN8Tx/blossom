import { MouseEvent, forwardRef, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../store';
import selectById from '../../../../../store/chatSelector';

import MessageDate from '../message-date/MessageDate';
import Message from '../message/Message';

import type { Messages } from '../../../../../../../models/data';

import style from './MessageList.module.scss';
import MenuContext from '../../../../../context/MenuContext';

const MessageList = forwardRef<HTMLDivElement>((_, ref) => {
  const { id } = useParams();
  const { setPosX, setPosY, isOpen, setIsOpen, setSelectedMessageId } =
    useContext(MenuContext);

  const data = useAppSelector((state) => selectById(state, Number(id))!);
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
      className={style.list}
      ref={ref}
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      {data.messages.map((message, index) => {
        const prevMessage: Messages | null =
          index === 0 ? null : data.messages[index - 1];

        if (prevMessage === null) {
          if (Number(message.userId) === Number(userId)) {
            return (
              <>
                <MessageDate date={message.date} key={'DateKey' + index} />
                <Message
                  isUser={true}
                  isDate={true}
                  messageObj={message}
                  key={message.id}
                />
              </>
            );
          } else {
            return (
              <>
                <MessageDate date={message.date} key={'DateKey' + index} />
                <Message
                  isUser={false}
                  isDate={true}
                  messageObj={message}
                  key={message.id}
                />
              </>
            );
          }
        } else {
          const messageParseDate = new Date(Number(message.date));
          const prevMessageParseDate = new Date(Number(prevMessage.date));

          const messageDate = `${messageParseDate.getHours()}:${messageParseDate.getMinutes()}|${messageParseDate.getDate()}.${messageParseDate.getMonth()}`;
          const messageDay = `${messageParseDate.getDate()}.${messageParseDate.getMonth()}`;

          const prevMessageDate = `${prevMessageParseDate.getHours()}:${prevMessageParseDate.getMinutes()}|${prevMessageParseDate.getDate()}.${prevMessageParseDate.getMonth()}`;
          const prevMessageDay = `${prevMessageParseDate.getDate()}.${prevMessageParseDate.getMonth()}`;

          if (Number(message.userId) === Number(userId)) {
            if (Number(message.userId) === Number(prevMessage.userId)) {
              // ЕСЛИ ОДИН ПОЛЬЗОВАТЕЛЬ У ДВУХ ПОДРЯД СМС
              if (messageDate === prevMessageDate) {
                //  ОДНО ВРЕМЯ
                return (
                  <Message
                    isUser={true}
                    isDate={false}
                    messageObj={message}
                    key={message.id}
                  />
                );
              } else {
                //  РАЗНОЕ ВРЕМЯ
                if (messageDay !== prevMessageDay) {
                  return (
                    <>
                      <MessageDate
                        key={'DateKey' + index}
                        date={message.date}
                      />
                      <Message
                        isUser={true}
                        isDate={true}
                        messageObj={message}
                        key={message.id}
                      />
                    </>
                  );
                }
                return (
                  <Message
                    isUser={true}
                    isDate={true}
                    messageObj={message}
                    key={message.id}
                  />
                );
              }
            } else {
              // ЕСЛИ РАЗНЫЕ ПОЛЬЗОВАТЕЛИ У ДВУХ ПОДРЯД СМС
              if (messageDay !== prevMessageDay) {
                return (
                  <>
                    <MessageDate date={message.date} key={'DateKey' + index} />
                    <Message
                      isUser={true}
                      isDate={true}
                      messageObj={message}
                      key={message.id}
                    />
                  </>
                );
              }
              return (
                <Message
                  isUser={true}
                  isDate={true}
                  messageObj={message}
                  key={message.id}
                />
              );
            }
          } else {
            if (Number(message.userId) === Number(prevMessage.userId)) {
              if (messageDate === prevMessageDate) {
                //  ОДНО ВРЕМЯ
                return (
                  <Message
                    isUser={false}
                    isDate={false}
                    messageObj={message}
                    key={message.id}
                  />
                );
              } else {
                //  РАЗНОЕ ВРЕМЯ
                if (messageDay !== prevMessageDay) {
                  return (
                    <>
                      <MessageDate
                        date={message.date}
                        key={'DateKey' + index}
                      />
                      <Message
                        isUser={false}
                        isDate={true}
                        messageObj={message}
                        key={message.id}
                      />
                    </>
                  );
                }
                return (
                  <Message
                    isUser={false}
                    isDate={true}
                    messageObj={message}
                    key={message.id}
                  />
                );
              }
            } else {
              // ЕСЛИ РАЗНЫЕ ПОЛЬЗОВАТЕЛИ У ДВУХ ПОДРЯД СМС
              if (messageDay !== prevMessageDay) {
                return (
                  <>
                    <MessageDate date={message.date} key={'DateKey' + index} />
                    <Message
                      isUser={false}
                      isDate={true}
                      messageObj={message}
                      key={message.id}
                    />
                  </>
                );
              }
              return (
                <Message
                  isUser={false}
                  isDate={true}
                  messageObj={message}
                  key={message.id}
                />
              );
            }
          }
        }
      })}
    </div>
  );
});

export default MessageList;
