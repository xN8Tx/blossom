import { Link } from 'react-router-dom';

import style from './Avatar.module.scss';

type AvatarProps = {
  avatar: string;
  to: string;
  size: 's' | 'm';
};

export default function Avatar({ avatar, to, size }: AvatarProps) {
  return (
    <Link to={to} className={style.wrapper} data-size={size}>
      <img src={avatar} alt='Avatar' className={style.image} />
    </Link>
  );
}
