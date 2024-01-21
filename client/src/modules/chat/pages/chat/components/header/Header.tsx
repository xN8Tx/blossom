import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/store';
import selectById from '@chat/store/selectors/selectById';

import BackButton from '@/components/back-button/BackButton';
import Info from './info/Info';
import Menu from './menu/Menu';

import style from './Header.module.scss';
import { useContext } from 'react';
import { ModalContext } from 'blossom-react-ui';

export default function Header() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => selectById(state, Number(id!))!);
  const { modalState } = useContext(ModalContext);

  const isModalOpen = modalState !== 'idle';

  return (
    <header className={style.header} is-modal-open={`${isModalOpen}`}>
      <div className={style.container}>
        <BackButton />
        <Info user={user} />
      </div>
      <Menu />
    </header>
  );
}
