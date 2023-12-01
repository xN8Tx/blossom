import { Link } from 'react-router-dom';

import Paragraph from '@/ui/paragraphs/Paragraph';
import Avatar from '@/components/avatar/Avatar';
import Heading from '@/ui/headings/Heading';

import style from './UserItem.module.scss';

type UserItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  status: boolean;
};

export default function UserItem({
  avatar,
  firstName,
  lastName,
  username,
  id,
  status,
}: UserItemProps) {
  const linkToUser = `/contacts/user/${id}`;

  return (
    <Link to={linkToUser} className={style.container}>
      <Avatar
        isLink={false}
        avatar={avatar}
        firstName={firstName}
        size='s'
        status={status}
      />
      <div className={style.wrapper}>
        <Heading size='s' color='user'>
          {firstName} {lastName}
        </Heading>
        <Paragraph size='s' color='user'>
          @{username}
        </Paragraph>
      </div>
    </Link>
  );
}
