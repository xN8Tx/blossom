import { NavLink } from 'react-router-dom';

import ContactIcon from '@/assets/svg/ContactIcon';
import ChatIcon from '@/assets/svg/ChatIcon';
import SettingsIcon from '@/assets/svg/SettingsIcon';

import type { ClassNameType } from '@/models';

import style from './Navbar.module.scss';

export default function Navbar() {
  const className = ({ isActive }: ClassNameType) =>
    isActive ? style.active : style.link;

  return (
    <nav className={style.wrapper}>
      <NavLink to='/contacts' className={className}>
        <ContactIcon />
      </NavLink>
      <NavLink to='/' className={className}>
        <ChatIcon />
      </NavLink>
      <NavLink to='/settings' className={className}>
        <SettingsIcon />
      </NavLink>
    </nav>
  );
}
