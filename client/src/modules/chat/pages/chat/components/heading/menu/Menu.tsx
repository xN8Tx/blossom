import { useState } from 'react';
import MenuButton from '../menu-button/MenuButton';
import MenuList from '../menu-list/MenuList';

import style from './Menu.module.scss';

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onButtonClick = () => setIsOpen(!isOpen);

  return (
    <div className={style.container} is-open={isOpen.toString()}>
      <MenuButton onClick={onButtonClick} />
      <MenuList />
    </div>
  );
}
