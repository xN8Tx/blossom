import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';

import useModal from '../modal/hooks/useModal';
import { getContacts } from './store/contacts/contactThunk';

import Sidebar from './components/sidebar/Sidebar';

export default function Contact() {
  const dispatch = useAppDispatch();
  const modal = useModal();
  const { t } = useTranslation();

  const loading = useAppSelector((state) => state.contacts.loading);
  const userLoading = useAppSelector((state) => state.user.loading);

  useEffect(() => {
    if (loading === 'idle' && userLoading === 'success') {
      dispatch(getContacts());
    }
  }, [userLoading]);

  useEffect(() => {
    if (loading === 'loading') {
      modal('loading', t('etc.loading'));
    }
    if (loading === 'success') {
      modal('idle', '');
    }
  }, [loading]);

  return (
    <main className='page-wrapper'>
      <Sidebar />
      <Outlet />
    </main>
  );
}
