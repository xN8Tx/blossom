import { Outlet } from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';

export default function Settings() {
  return (
    <main className='page-wrapper'>
      <Sidebar />
      <Outlet />
    </main>
  );
}
