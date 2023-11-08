import { useEffect, useRef } from 'react';
import MessageList from './message-list/MessageList';

import style from './Wrapper.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { useParams } from 'react-router-dom';
import selectById from '../../../../store/chatSelector';
import { readMessage } from '../../../../store/chatThunk';

export default function Wrapper() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const messages = useAppSelector((state) => selectById(state, Number(id)));

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: listRef.current?.clientHeight,
    });
  });

  useEffect(() => {
    if (Number(messages!.notification) > 0) {
      dispatch(readMessage(messages!.id.toString()));
    }
  }, [messages?.notification]);

  return (
    <div className={style.wrapper} ref={containerRef}>
      <MessageList ref={listRef} />
    </div>
  );
}
