import { Routes, Route } from 'react-router-dom';

import Auth from '../modules/auth/Auth';
import Login from '../modules/auth/pages/login/Login';
import Registration from '../modules/auth/pages/registration/Registration';
import Code from '../modules/auth/pages/code/Code';
import Chat from '../modules/chat/Chat';

export default function Router() {
  return (
    <Routes>
      <Route path='auth' element={<Auth />}>
        <Route index element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='code' element={<Code />} />
      </Route>
      <Route path='chat' element={<Chat />} />
    </Routes>
  );
}
