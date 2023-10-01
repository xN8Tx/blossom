import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../../../store';

import Heading from '../../../../../ui/headings/Heading';
import Paragraph from '../../../../../ui/paragraphs/Paragraph';

import typicalAvatar from '../../../../../assets/images/avatar.webp';

import type { ClassNameType } from '../../../../../models';

import linkIcon from '../../../assets/linkIcon.svg';

import style from './User.module.scss';

export default function User() {
  const { username, firstName, lastName, avatar } = useAppSelector(
    (state) => state.user.data
  );

  const name = firstName + ' ' + lastName;
  const avatarUrl = avatar !== null ? avatar : typicalAvatar;

  const className = ({ isActive }: ClassNameType) =>
    isActive ? `${style.wrapper} ${style.active}` : style.wrapper;

  return (
    <NavLink to='/settings/profile' className={className}>
      <div className={style.container}>
        <img src={avatarUrl} alt='Avatar' className={style.avatar} />
        <div className={style.text}>
          <Heading size='s'>{name}</Heading>
          <Paragraph size='l' color='user'>
            @{username}
          </Paragraph>
        </div>
      </div>
      <img src={linkIcon} alt='Next icon' className={style.icon} />
    </NavLink>
  );
}
