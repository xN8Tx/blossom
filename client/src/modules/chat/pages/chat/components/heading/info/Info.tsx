import Avatar from '@/components/avatar/Avatar';
import Title from '../title/Title';

import type { User } from '@/models/data';

import style from './Info.module.scss';

type InfoProps = {
  user: User;
};

export default function Info({ user }: InfoProps) {
  const profileUrl = `/user/${user.id}`;

  return (
    <div className={style.wrapper}>
      <Avatar
        isLink={true}
        to={profileUrl}
        avatar={user.avatar}
        firstName={user.firstName}
        size='m'
        status={user.status}
      />
      <Title user={user} />
    </div>
  );
}
