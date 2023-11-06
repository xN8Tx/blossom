import { useAppSelector } from '../../../../../store';
import ChatItem from '../chat-item/ChatItem';

import style from './ChatList.module.scss';

export default function ChatList() {
  const data = useAppSelector((state) => state.chat.data);

  return (
    <div className={style.wrapper}>
      {data?.map((chat) => (
        <ChatItem
          key={chat.id}
          chatId={chat.id}
          title={chat.title}
          avatar={chat.avatar!}
          user={chat.user}
          messages={chat.messages}
        />
      ))}
    </div>
  );
}
