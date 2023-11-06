// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store';
// import useModal from '../modal/hooks/useModal';

import Sidebar from './components/sidebar/Sidebar';

export default function Chat() {
  // const modal = useModal();

  const loading = useAppSelector((state) => state.chat.loading);

  // useEffect(() => {
  //   if (loading === 'success') modal('success', 'Chat downloaded', 3000);
  //   if (loading === 'loading') modal('success', 'Chat loading');
  //   if (loading === 'error') modal('error', 'Error', 3000);
  // }, []);

  return (
    <>
      {loading === 'success' && (
        <main className='page-wrapper'>
          <Sidebar />
          <Outlet />
        </main>
      )}
    </>
  );
}
