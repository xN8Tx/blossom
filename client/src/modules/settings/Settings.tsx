import { Outlet } from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';
import { useAppSelector } from '../../store';

export default function Settings() {
  const loading = useAppSelector((state) => state.user.loading);

  return (
    <main className='page-wrapper'>
      <Sidebar />
      {loading === 'success' && <Outlet />}
    </main>
  );
}
