import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

import routesComeback from '../utils/routesComeback';

import Auth from '@auth/Auth';
import Chat from '@chat/Chat';
import Contact from '@contact/Contact';
import Settings from '@settings/Settings';

import authRoutes from './AuthRoutes';
import chatRoutes from './ChatRoutes';
import contactRoutes from './ContactRoutes';
import settingRoutes from './SettingsRoutes';

export default function Router() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <Routes>
      {isAuth !== 'auth' && (
        <Route path='/' element={<Auth />}>
          {routesComeback(authRoutes)}
        </Route>
      )}
      {isAuth === 'auth' && (
        <>
          <Route path='/' element={<Chat />}>
            {routesComeback(chatRoutes)}
          </Route>
          <Route path='settings' element={<Settings />}>
            {routesComeback(settingRoutes)}
          </Route>
          <Route path='contacts' element={<Contact />}>
            {routesComeback(contactRoutes)}
          </Route>
        </>
      )}
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
