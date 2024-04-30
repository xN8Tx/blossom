/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useModal } from 'blossom-react-ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import decodeJWT from '@/utils/decodeJwt';

import { useAppDispatch, useAppSelector } from '@/store';
import { getUser } from '@/store/user/userThunk';

import { getContacts } from '@contact/store/contacts/contactThunk';
import { getChats } from '@chat/store/thunk/messenger-action/messengerAction';
import {
  setWebsocketHandler,
  startWebsocket,
} from '@chat/store/thunk/ws/websocket';

export default function AppInit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modal = useModal();
  const { t } = useTranslation();

  const { isAuth } = useAppSelector((state) => state.auth);

  const userLoading = useAppSelector((state) => state.user.loading);
  const chatLoading = useAppSelector((state) => state.chat.loading);
  const contactLoading = useAppSelector((state) => state.contacts.loading);

  // USER
  const isUserNotFetchable =
    isAuth !== 'auth' &&
    userLoading !== 'idle' &&
    localStorage.getItem('accessToken') === undefined;

  useEffect(() => {
    if (isUserNotFetchable) return () => {};

    const token = localStorage.getItem('accessToken');

    if (token === null) return () => navigate('/');
    const { id } = decodeJWT(token!);

    const title = {
      id: id,
    };

    dispatch(getUser(title));
  }, [isAuth]);

  // CONTACT
  const isContactFetchable =
    contactLoading === 'idle' && userLoading === 'success';
  useEffect(() => {
    if (!isContactFetchable) return () => {};
    dispatch(getContacts());
  }, [userLoading]);

  // CHAT
  const isChatFetchable = userLoading === 'success' && chatLoading === 'idle';
  useEffect(() => {
    if (!isChatFetchable) return () => {};
    dispatch(getChats());
  }, [userLoading]);

  // Websocket
  const openWebsocketHandler = () => modal('success', t('ws.success'));
  const closeWebsocketHandler = () => modal('error', t('ws.error'));

  const isAllFetchable =
    userLoading === 'success' &&
    chatLoading === 'success' &&
    contactLoading === 'success';

  useEffect(() => {
    if (!isAllFetchable) return () => {};
    dispatch(
      setWebsocketHandler({
        openCb: openWebsocketHandler,
        closeCb: closeWebsocketHandler,
      })
    ).then(() => {
      dispatch(startWebsocket());
    });
  }, [isAllFetchable]);

  return <></>;
}
