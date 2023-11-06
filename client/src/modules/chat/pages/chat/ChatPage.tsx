import { useEffect } from 'react';

import Header from './components/heading/Header';
import Form from './components/form/Form';

import style from './ChatPage.module.scss';
import Wrapper from './components/wrapper/Wrapper';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import selectById from '../../store/chatSelector';
import { getChatMessages } from '../../store/chatSlice';

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
      <Header />
      {data!.isLoaded === 'success' && <Wrapper />}
      <Form />
    </section>
  );
}
