import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/store';
import selectById from '@chat/store/chatSelector';

import BackButton from '@/components/back-button/BackButton';
import Info from './info/Info';
import Menu from './menu/Menu';

import style from './Header.module.scss';

export default function Header() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => selectById(state, Number(id))!);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <BackButton />
        <Info user={user} />
      </div>
      <Menu />
    </header>
  );
}
