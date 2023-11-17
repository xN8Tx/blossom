import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';

import selectById from '../../store/chatSelector';

import MenuProvider from '../../context/MenuProvider';

import Header from './components/heading/Header';
import Form from './components/form/Form';
import Wrapper from './components/wrapper/Wrapper';
import Menu from './components/menu/Menu';

import style from './ChatPage.module.scss';
import { getChatMessages } from '../../store/chatThunk';

export default function ChatPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const data = useAppSelector((state) => selectById(state, Number(id)));

  useEffect(() => {
    if (isConnected && data && data.isLoaded === 'idle') {
      dispatch(getChatMessages(id!));
    }
  }, [data, isConnected, id]);

  const isRender = data!.isLoaded === 'success';

  return (
    <section className={style.wrapper}>
      <MenuProvider>
        <Header />
        {isRender && <Wrapper />}
        <Menu />
        <Form />
      </MenuProvider>
    </section>
  );
}
