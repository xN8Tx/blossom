import { Heading, Paragraph } from 'blossom-react-ui';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '@/store';

import linkIcon from '@settings/assets/linkIcon.svg';

import type { ClassNameType } from '@/models';

import style from './User.module.scss';

export default function User() {
  const { username, firstName, lastName, avatar } = useAppSelector(
    (state) => state.user.data
  );

  const name = firstName + ' ' + lastName;
  const firstLetter = name[0];
  const avatarUrl = avatar !== null && avatar;

  const className = ({ isActive }: ClassNameType) =>
    isActive ? `${style.wrapper} ${style.active}` : style.wrapper;

  return (
    <NavLink to='/settings/profile' className={className}>
      <div className={style.container}>
        <div className={style.avatarContainer}>
          {avatarUrl && (
            <img src={avatarUrl} alt='Avatar' className={style.avatar} />
          )}
          {!avatarUrl && (
            <Heading size='m' weight='bold' color='primary'>
              {firstLetter}
            </Heading>
          )}
        </div>
        <div className={style.text}>
          <Heading size='xs' weight='bold'>
            {name}
          </Heading>
          <Paragraph size='l' weight='medium' color='primary'>
            @{username}
          </Paragraph>
        </div>
      </div>
      <img src={linkIcon} alt='Next icon' className={style.icon} />
    </NavLink>
  );
}
