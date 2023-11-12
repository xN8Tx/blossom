import { useRef } from 'react';

import MenuList from './menu-list/MenuList';

import style from './Menu.module.scss';

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={style.container}>
      <div className={style.wrapper} ref={ref}>
        {ref && <MenuList ref={ref} />}
      </div>
    </div>
  );
}
