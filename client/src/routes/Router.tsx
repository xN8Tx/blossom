import { Routes, Route } from 'react-router-dom';

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

export default function Router() {
  return (
    <Routes>
      <Route path='auth' element={<Auth />}>
        <Route index element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='code' element={<Code />} />
      </Route>
      <Route path='chat' element={<Chat />} />
      <Route path='settings' element={<Settings />}>
        {settingRoutes.map((elm, ind) => {
          if (elm.path === '/') {
            return <Route index element={elm.element} key={ind} />;
          }
          return <Route path={elm.path} element={elm.element} key={ind} />;
        })}
      </Route>
      <Route path='contacts' element={<Contact />}>
        <Route index element={<Home />} />
        <Route path='user/:id' element={<Profile />} />
      </Route>
    </Routes>
  );
}
