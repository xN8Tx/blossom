import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store';

import Sidebar from './components/sidebar/Sidebar';

export default function Settings() {
  const loading = useAppSelector((state) => state.user.loading);

  return (
    <main className='page-wrapper'>
      <Sidebar />
      {loading === 'success' && <Outlet />}
    </main>
  );
}
