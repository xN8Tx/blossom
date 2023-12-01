import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { changeIsLoaded } from './store/chatSlice';

import useModal from '../modal/hooks/useModal';

import Sidebar from './components/sidebar/Sidebar';

export default function Chat() {
  const modal = useModal();
  const dispatch = useAppDispatch();

  const { loading, isLoaded, isReRender } = useAppSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (isLoaded === true) return () => {};
    switch (loading) {
      case 'success':
        modal('success', 'Chat downloaded', 1000);
        dispatch(changeIsLoaded());
        break;
      case 'loading':
        modal('success', 'Chat loading');
        break;
      case 'error':
        modal('error', 'Error');
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const isShow = loading === 'success' && !isReRender;

  return (
    <>
      {isShow && (
        <main className='page-wrapper'>
          <Sidebar />
          <Outlet />
        </main>
      )}
    </>
  );
}
