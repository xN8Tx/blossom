import { forwardRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../store';
import selectById from '../../../../../store/chatSelector';

import MessageUser from '../message-user/MessageUser';
import MessageCompanion from '../message-companion/MessageCompanion';

import type { Messages } from '../../../../../../../models/data';

import style from './MessageList.module.scss';
import MessageDate from '../message-date/MessageDate';

const MessageList = forwardRef<HTMLDivElement>((_, ref) => {
  const { id } = useParams();

  const data = useAppSelector((state) => selectById(state, Number(id))!);
  const userId = useAppSelector((state) => state.user.data.id);

  return (
    <div className={style.list} ref={ref}>
      {data.messages.map((message, index) => {
        const prevMessage: Messages | null =
          index === 0 ? null : data.messages[index - 1];

        if (prevMessage === null) {
          if (Number(message.userId) === Number(userId)) {
            return (
              <>
                <MessageDate
                  date={message.date}
                  key={Math.floor((Date.now() / 10) * (index + 1))}
                />
                <MessageUser
                  key={message.id}
                  message={message.message}
                  date={message.date}
                  isDate={true}
                  isEdit={message.isEdit}
                  status={message.status}
                />
              </>
            );
          } else {
            return (
              <>
                <MessageDate
                  date={message.date}
                  key={Math.floor((Date.now() / 10) * (index + 1))}
                />
                <MessageCompanion
                  key={message.id}
                  isEdit={message.isEdit}
                  message={message.message}
                  date={message.date}
                  isDate={true}
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
                  <MessageUser
                    key={message.id}
                    message={message.message}
                    isDate={false}
                    isEdit={message.isEdit}
                    status={message.status}
                  />
                );
              } else {
                //  РАЗНОЕ ВРЕМЯ
                if (messageDay !== prevMessageDay) {
                  return (
                    <>
                      <MessageDate
                        key={Math.floor((Date.now() / 10) * (index + 1))}
                        date={message.date}
                      />
                      <MessageUser
                        key={message.id}
                        message={message.message}
                        isDate={true}
                        date={message.date}
                        isEdit={message.isEdit}
                        status={message.status}
                      />
                    </>
                  );
                }
                return (
                  <MessageUser
                    key={message.id}
                    message={message.message}
                    isDate={true}
                    date={message.date}
                    isEdit={message.isEdit}
                    status={message.status}
                  />
                );
              }
            } else {
              // ЕСЛИ РАЗНЫЕ ПОЛЬЗОВАТЕЛИ У ДВУХ ПОДРЯД СМС
              if (messageDay !== prevMessageDay) {
                return (
                  <>
                    <MessageDate
                      date={message.date}
                      key={Math.floor((Date.now() / 10) * (index + 1))}
                    />
                    <MessageUser
                      key={message.id}
                      message={message.message}
                      isDate={true}
                      date={message.date}
                      isEdit={message.isEdit}
                      status={message.status}
                    />
                  </>
                );
              }
              return (
                <MessageUser
                  key={message.id}
                  message={message.message}
                  isDate={true}
                  date={message.date}
                  isEdit={message.isEdit}
                  status={message.status}
                />
              );
            }
          } else {
            if (Number(message.userId) === Number(prevMessage.userId)) {
              if (messageDate === prevMessageDate) {
                //  ОДНО ВРЕМЯ
                return (
                  <MessageCompanion
                    isEdit={message.isEdit}
                    key={message.id}
                    message={message.message}
                    isDate={false}
                  />
                );
              } else {
                //  РАЗНОЕ ВРЕМЯ
                if (messageDay !== prevMessageDay) {
                  return (
                    <>
                      <MessageDate
                        date={message.date}
                        key={Math.floor((Date.now() / 10) * (index + 1))}
                      />
                      <MessageCompanion
                        isEdit={message.isEdit}
                        key={message.id}
                        message={message.message}
                        isDate={true}
                        date={message.date}
                      />
                    </>
                  );
                }
                return (
                  <MessageCompanion
                    key={message.id}
                    message={message.message}
                    isEdit={message.isEdit}
                    isDate={true}
                    date={message.date}
                  />
                );
              }
            } else {
              // ЕСЛИ РАЗНЫЕ ПОЛЬЗОВАТЕЛИ У ДВУХ ПОДРЯД СМС
              if (messageDay !== prevMessageDay) {
                return (
                  <>
                    <MessageDate
                      date={message.date}
                      key={Math.floor((Date.now() / 10) * (index + 1))}
                    />
                    <MessageCompanion
                      isEdit={message.isEdit}
                      key={message.id}
                      message={message.message}
                      isDate={true}
                      date={message.date}
                    />
                  </>
                );
              }
              return (
                <MessageCompanion
                  isEdit={message.isEdit}
                  key={message.id}
                  message={message.message}
                  isDate={true}
                  date={message.date}
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
