import { Link } from 'react-router-dom';

import Heading from '../../ui/headings/Heading';

import style from './Avatar.module.scss';

type AvatarProps = {
  avatar: string | null;
  firstName: string;
  to?: string;
  size: 's' | 'm' | 'l';
  isLink: boolean;
  status: boolean;
};

export default function Avatar({
  avatar,
  firstName,
  to,
  size,
  isLink,
  status,
}: AvatarProps) {
  const isAvatar = avatar !== null;
  const firstLatter = firstName[0];

  if (!isLink) {
    return (
      <div className={style.container} data-size={size}>
        <div className={style.wrapper}>
          {isAvatar ? (
            <img src={avatar} alt='Avatar' className={style.image} />
          ) : (
            <Heading size='l' color='user'>
              {firstLatter}
            </Heading>
          )}
        </div>
        {status && (
          <div className={style.status}>
            <span></span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={style.container} data-size={size}>
      <Link to={to!} className={style.wrapper}>
        {isAvatar ? (
          <img src={avatar} alt='Avatar' className={style.image} />
        ) : (
          <Heading size='l' color='user'>
            {firstLatter}
          </Heading>
        )}
      </Link>
      {status && (
        <div className={style.status}>
          <span></span>
        </div>
      )}
    </div>
  );
}
