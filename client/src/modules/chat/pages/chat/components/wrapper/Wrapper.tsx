import { useEffect, useRef } from 'react';
import MessageList from './message-list/MessageList';

import style from './Wrapper.module.scss';

export default function Wrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: listRef.current?.clientHeight,
    });
  });

  return (
    <div className={style.wrapper} ref={containerRef}>
      <MessageList ref={listRef} />
    </div>
  );
}
