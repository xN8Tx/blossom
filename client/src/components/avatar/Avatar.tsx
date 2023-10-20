import { Link } from 'react-router-dom';

import Heading from '../../ui/headings/Heading';

import style from './Avatar.module.scss';

type AvatarProps = {
  avatar: string | null;
  firstName: string;
  to?: string;
  size: 's' | 'm' | 'l';
  isLink: boolean;
};

export default function Avatar({
  avatar,
  firstName,
  to,
  size,
  isLink,
}: AvatarProps) {
  const isAvatar = avatar !== null;
  const firstLatter = firstName[0];

  if (!isLink) {
    return (
      <div className={style.wrapper} data-size={size}>
        {isAvatar ? (
          <img src={avatar} alt='Avatar' className={style.image} />
        ) : (
          <Heading size='l' color='user'>
            {firstLatter}
          </Heading>
        )}
      </div>
    );
  }

  return (
    <Link to={to!} className={style.wrapper} data-size={size}>
      {isAvatar ? (
        <img src={avatar} alt='Avatar' className={style.image} />
      ) : (
        <Heading size='l' color='user'>
          {firstLatter}
        </Heading>
      )}
    </Link>
  );
}
