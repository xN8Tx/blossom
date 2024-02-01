import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { readMessage } from '@/modules/chat/store/thunk/chat-action/chatAction';
import selectById from '@chat/store/selectors/selectById';

import EmojiContext from '@chat/context/emoji/EmojiContext';

import MessageList from './message-list/MessageList';
import Empty from './empty/Empty';

import style from './Wrapper.module.scss';

export default function Wrapper() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const messages = useAppSelector((state) => selectById(state, Number(id)));
  const { isEmojiOpen, setIsEmojiOpen } = useContext(EmojiContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const closeEmojiHandler = () => setIsEmojiOpen(false);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: listRef.current?.clientHeight,
    });
  });

  useEffect(() => {
    if (Number(messages!.notification) > 0) {
      dispatch(readMessage(messages!.id.toString()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages?.notification, dispatch]);

  const isNull = messages?.messages.length === 0;

  return (
    <div
      className={style.wrapper}
      ref={containerRef}
      onClick={closeEmojiHandler}
      is-emoji-open={`${isEmojiOpen}`}
      data-id='message-page-wrapper'
    >
      {isNull && <Empty />}
      {!isNull && <MessageList ref={listRef} />}
    </div>
  );
}
