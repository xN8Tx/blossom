import { Link } from 'react-router-dom';
import { Heading, Paragraph } from 'blossom-react-ui';

import Avatar from '@/components/avatar/Avatar';

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
        <Heading size='xs' weight='bold' color='primary'>
          {firstName} {lastName}
        </Heading>
        <Paragraph size='m' weight='medium' color='primary'>
          @{username}
        </Paragraph>
      </div>
    </Link>
  );
}
