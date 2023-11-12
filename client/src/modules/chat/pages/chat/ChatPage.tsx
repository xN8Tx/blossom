import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';

import selectById from '../../store/chatSelector';
import { getChatMessages } from '../../store/chatSlice';

import MenuProvider from '../../context/MenuProvider';

import Header from './components/heading/Header';
import Form from './components/form/Form';
import Wrapper from './components/wrapper/Wrapper';
import Menu from './components/menu/Menu';

import style from './ChatPage.module.scss';

export default function ChatPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => selectById(state, Number(id)));

  useEffect(() => {
    if (data!.isLoaded === 'idle') {
      dispatch(getChatMessages(id!));
    }
  }, [data]);

  return (
    <section className={style.wrapper}>
      <MenuProvider>
        <Header />
        {data!.isLoaded === 'success' && <Wrapper />}
        <Menu />
        <Form />
      </MenuProvider>
    </section>
  );
}
