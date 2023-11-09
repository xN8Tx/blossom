import Home from '../modules/chat/pages/home/Home';
import ChatPage from '../modules/chat/pages/chat/ChatPage';
import Profile from '../modules/profile/Profile';

const chatRoutes = [
  { path: 'index', element: <Home /> },
  { path: 'user/:id', element: <Profile /> },
  { path: 'chat/:id', element: <ChatPage /> },
];

export default chatRoutes;
