import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from 'blossom-react-ui';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store';

import Sidebar from './components/sidebar/Sidebar';

export default function Contact() {
  const modal = useModal();
  const { t } = useTranslation();

  const loading = useAppSelector((state) => state.contacts.loading);

  useEffect(() => {
    if (loading === 'loading') {
      modal('loading', t('etc.loading'));
    }
    if (loading === 'success') {
      modal('idle', '');
    }
  }, [loading, modal, t]);

  return (
    <main className='page-wrapper'>
      <Sidebar />
      <Outlet />
    </main>
  );
}
