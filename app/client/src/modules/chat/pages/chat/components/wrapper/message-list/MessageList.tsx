import {
  MouseEvent,
  TouchEvent,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
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

  const timeoutRef = useRef<number | null>(null);

  const userId = useAppSelector((state) => state.user.data.id);
  const data = useAppSelector((state) => selectById(state, Number(id!))!);
  const { setPosX, setPosY, isOpen, setIsOpen, setSelectedMessageId } =
    useContext(MenuContext);

  const getContainer = (target: HTMLElement): HTMLElement => {
    if (!target.getAttribute('is-user'))
      return getContainer(target.previousElementSibling as HTMLElement);
    return target;
  };

  const startMenu = (
    event: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;
    const targetTag = target.tagName;
    let id;

    if (targetTag === 'IMG' || targetTag === 'VIDEO') {
      id = target.parentElement?.parentElement?.getAttribute('data-id');
    } else if (target.getAttribute('data-id') === 'message-file-wrapper') {
      id = target.parentElement?.getAttribute('data-id');
    } else {
      id = target.getAttribute('data-id');
    }

    if (id) {
      setSelectedMessageId(id);
      if (!isOpen) setIsOpen(true);
    } else {
      if (isOpen) setIsOpen(false);
    }
  };

  const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (document.body.clientWidth < 768) return event.preventDefault();
    event.preventDefault();

    if (document.documentElement.clientWidth > 768) {
      setPosX(event.clientX - 333 + 50);
      setPosY(event.clientY - 90 + 50);
    } else {
      setPosX(event.clientY - 20 + 50);
      setPosY(event.clientY - 90 + 50);
    }

    startMenu(event);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    timeoutRef.current = window.setTimeout(() => {
      event.preventDefault();

      const target = getContainer(event.target as HTMLElement);
      let posX, posY;

      if (target.getAttribute('is-user') === 'true') {
        const { y, height } = target.getBoundingClientRect();

        posX = document.body.clientWidth - 185;
        posY = y + height;

        setPosX(posX);
        setPosY(posY);

        startMenu(event);
      } else {
        const { y, height } = target.getBoundingClientRect();

        posX = 35;
        posY = y + height;

        setPosX(posX);
        setPosY(posY);

        startMenu(event);
      }
    }, 800);
  };
  const onTouchEnd = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  const onClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setSelectedMessageId('');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      onContextMenu={onContextMenu}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
