/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import { getUser } from '../store/user/userThunk';
import { getChats, startWebsocket } from '../modules/chat/store/chatThunk';
import { getContacts } from '../modules/contact/store/contacts/contactThunk';

import decodeJWT from '../utils/decodeJwt';

export default function AppInit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    if (token === null) return () => navigate('/auth');
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

  const isAllFetchable =
    userLoading === 'success' &&
    chatLoading === 'success' &&
    contactLoading === 'success';
  useEffect(() => {
    if (!isAllFetchable) return () => {};
    dispatch(startWebsocket());
  }, [isAllFetchable]);

  return <></>;
}
