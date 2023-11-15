import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import useModal from '../modal/hooks/useModal';

import Sidebar from './components/sidebar/Sidebar';
import { changeIsLoaded } from './store/chatSlice';

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
