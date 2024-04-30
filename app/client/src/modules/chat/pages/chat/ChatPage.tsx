import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { getChatMessages } from '../../store/thunk/chat-action/chatAction';
import selectById from '@chat/store/selectors/selectById';

import MenuProvider from '@chat/context/menu/MenuProvider';
import EmojiProvider from '@chat/context/emoji/EmojiProvider';
import InputProvider from '@chat/context/input/InputProvider';
import MediaWindowProvider from '@chat/context/media-window/MediaWindowProvider';

import Form from './components/form/Form';
import Menu from './components/menu/Menu';
import Emoji from './components/emoji/Emoji';
import Header from './components/header/Header';
import Wrapper from './components/wrapper/Wrapper';
import MediaWindow from '@chat/components/media-window/MediaWindow';
import MessagesPreloader from './components/messages-preloader/MessagesPreloader';

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

  if (!data) return <Navigate to='/' />;

  const isRender = data!.isLoaded === 'success';

  return (
    <section className={style.wrapper}>
      <MenuProvider>
        <InputProvider>
          <EmojiProvider>
            <MediaWindowProvider>
              <Header />
              <Menu />
              {isRender && <Wrapper />}
              {!isRender && <MessagesPreloader />}
              <Form />
              <Emoji />
              <MediaWindow />
            </MediaWindowProvider>
          </EmojiProvider>
        </InputProvider>
      </MenuProvider>
    </section>
  );
}
