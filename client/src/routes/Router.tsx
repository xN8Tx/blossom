import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

import Auth from '../modules/auth/Auth';
import Login from '../modules/auth/pages/login/Login';
import Registration from '../modules/auth/pages/registration/Registration';
import Code from '../modules/auth/pages/code/Code';
import Chat from '../modules/chat/Chat';
import Settings from '../modules/settings/Settings';

import settingRoutes from './SettingsRoutes';
import Contact from '../modules/contact/Contact';
import Home from '../modules/contact/pages/home/Home';
import Profile from '../modules/profile/Profile';
import routesComeback from '../utils/routesComeback';
import chatRoutes from './ChatRoutes';

export default function Router() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const userLoading = useAppSelector((state) => state.user.loading);
  const chatLoading = useAppSelector((state) => state.chat.loading);
  const contactLoading = useAppSelector((state) => state.contacts.loading);

  const isAllLoading =
    userLoading === 'success' &&
    chatLoading === 'success' &&
    contactLoading === 'success';

  const isReadyToRender = isAuth === 'auth' && isAllLoading;

  return (
    <Routes>
      {isAuth !== 'auth' && (
        <Route path='/' element={<Auth />}>
          <Route index element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='code' element={<Code />} />
        </Route>
      )}
      {isReadyToRender && (
        <>
          <Route path='/' element={<Chat />}>
            {routesComeback(chatRoutes)}
          </Route>
          <Route path='settings' element={<Settings />}>
            {routesComeback(settingRoutes)}
          </Route>
          <Route path='contacts' element={<Contact />}>
            <Route index element={<Home />} />
            <Route path='user/:id' element={<Profile />} />
          </Route>
        </>
      )}
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
}
