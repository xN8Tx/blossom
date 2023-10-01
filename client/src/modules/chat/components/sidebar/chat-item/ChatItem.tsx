import Avatar from '../../../../../components/avatar/Avatar';
import Heading from '../../../../../ui/headings/Heading';
import Paragraph from '../../../../../ui/paragraphs/Paragraph';

import type { Messages } from '../../../models';

import style from './ChatItem.module.scss';

type ChatItemProps = {
  userId: number;
  lastName: string;
  firstName: string;
  avatar: string;
  lastMessage: Messages;
};

export default function ChatItem({
  userId,
  lastName,
  firstName,
  lastMessage,
  avatar,
}: ChatItemProps) {
  const link = `/chat/user/${userId}`;
  const name = `${firstName} ${lastName}`;
  const parseDate = new Date(lastMessage.date);
  const time = `${parseDate.getHours()}:${parseDate.getMinutes()}`;

  const message = lastMessage.message;
  // const messageFrom = lastMessage.userId;

  return (
    <div className={style.wrapper}>
      <Avatar to={link} avatar={avatar} size='s' />
      <div className={style.title}>
        <Heading size='s'>{name}</Heading>
        <Paragraph size='s' color='message'>
          {time}
        </Paragraph>
      </div>
      <div className={style.text}>
        <Paragraph size='m' color='user'>
          {message}
        </Paragraph>
      </div>
    </div>
  );
}
