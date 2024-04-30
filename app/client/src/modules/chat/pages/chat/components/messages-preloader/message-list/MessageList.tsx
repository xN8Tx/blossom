import Message from '../message-item/MessageItem';

import style from './MessageList.module.scss';

export default function MessageList() {
  return (
    <div className={style.list}>
      <Message isUser={true} />
      <Message isUser={false} />
      <Message isUser={true} />
    </div>
  );
}
