import { Heading, Paragraph } from 'blossom-react-ui';
import { Link } from 'react-router-dom';

import timeHandler from '@/modules/chat/utils/fromDateToTime';

import Avatar from '@/components/avatar/Avatar';
import Text from './text/Text';

import type { Messages, User } from '@/models/data';

import style from './ChatItem.module.scss';

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
  const linkToChat = `/chat/${chatId}`;

  const chatAvatar = avatar !== null ? avatar : user.avatar;
  const name =
    title.length !== 0 ? title : `${user.firstName} ${user.lastName}`;

  const isMessages = messages.length > 0;
  const lastMessage = isMessages && messages[messages.length - 1];
  const time = isMessages && timeHandler((lastMessage as Messages).date);

  return (
    <Link to={linkToChat} className={style.wrapper}>
      <Avatar
        isLink={false}
        avatar={chatAvatar}
        firstName={name}
        size='s'
        status={user.status}
      />
      <div className={style.body}>
        <div className={style.title}>
          <Heading size='xs' weight='bold' color='primary'>
            {name}
          </Heading>
          {isMessages && (
            <Paragraph size='m' weight='medium' color='dark'>
              {time}
            </Paragraph>
          )}
        </div>
        <Text messages={messages} notification={notification} />
      </div>
    </Link>
  );
}
