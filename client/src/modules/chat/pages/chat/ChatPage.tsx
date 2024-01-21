import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { getChatMessages } from '@chat/store/chatThunk';
import selectById from '@chat/store/selectors/selectById';

import MenuProvider from '@/modules/chat/context/menu/MenuProvider';
import EmojiProvider from '../../context/emoji/EmojiProvider';
import InputProvider from '../../context/input/InputProvider';

import Header from './components/header/Header';
import Form from './components/form/Form';
import Wrapper from './components/wrapper/Wrapper';
import Menu from './components/menu/Menu';
import Emoji from './components/emoji/Emoji';

import style from './ChatPage.module.scss';

export default function ChatPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const data = useAppSelector((state) => selectById(state, Number(id)));

  useEffect(() => {
    if (isConnected && data && data.isLoaded === 'idle') {
      dispatch(getChatMessages(id!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isConnected, id]);

  const isRender = data!.isLoaded === 'success';

  return (
    <section className={style.wrapper}>
      <MenuProvider>
        <InputProvider>
          <EmojiProvider>
            <Header />
            <Menu />
            {isRender && <Wrapper />}
            <Form />
            <Emoji />
          </EmojiProvider>
        </InputProvider>
      </MenuProvider>
    </section>
  );
}
