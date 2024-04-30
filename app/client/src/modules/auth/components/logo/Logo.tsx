import { Heading } from 'blossom-react-ui';

import logo from '@/assets/images/logo.ico';

import style from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={style.wrapper}>
      <img src={logo} alt='Logo' className={style.logo} />
      <Heading size='m' weight='bold' color='primary'>
        Blossom
      </Heading>
    </div>
  );
}
