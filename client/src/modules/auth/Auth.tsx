import { Outlet } from 'react-router-dom';

import Logo from './components/logo/Logo';

import style from './Auth.module.scss';

export default function Auth() {
  return (
    <main className={style.wrapper}>
      <Logo />
      <Outlet />
    </main>
  );
}
