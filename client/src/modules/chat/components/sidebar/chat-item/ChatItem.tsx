import { Link } from 'react-router-dom';
import Avatar from '../../../../../components/avatar/Avatar';
import Heading from '../../../../../ui/headings/Heading';
import Paragraph from '../../../../../ui/paragraphs/Paragraph';

import type { Messages, User } from '../../../../../models/data';

import style from './ChatItem.module.scss';
import Text from './text/Text';

type ChatItemProps = {
  chatId: number;
  title: string;
  avatar: string | null;
  notification: number;
  user: User;
  messages: Messages[];
};

export default function ChatItem({
  chatId,
  title,
  avatar,
  user,
  messages,
  notification,
}: ChatItemProps) {
  const linkToChat = `/chat/c/${chatId}`;

  const chatAvatar = avatar !== null ? avatar : user.avatar;
  const name =
    title.length !== 0 ? title : `${user.firstName} ${user.lastName}`;

  const lastMessage = messages[messages.length - 1];

  const parseDate = new Date(Number(lastMessage?.date));
  const time = `${parseDate?.getHours()}:${parseDate?.getMinutes()}`;

  return (
    <Link to={linkToChat} className={style.wrapper}>
      <Avatar isLink={false} avatar={chatAvatar} firstName={name} size='s' />
      <div className={style.body}>
        <div className={style.title}>
          <Heading size='s'>{name}</Heading>
          <Paragraph size='s' color='message'>
            {time}
          </Paragraph>
        </div>
        <Text messages={messages} notification={notification} />
      </div>
    </Link>
  );
}
