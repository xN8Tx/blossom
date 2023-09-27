import Heading from '../../../../ui/headings/Heading';

import logo from '../../../../assets/images/logo.ico';

import style from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={style.wrapper}>
      <img src={logo} alt='Logo' className={style.logo} />
      <Heading size='l'>Blossom</Heading>
    </div>
  );
}
