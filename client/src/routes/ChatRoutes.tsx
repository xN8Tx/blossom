import Home from '../modules/chat/pages/home/Home';
import ChatPage from '../modules/chat/pages/chat/ChatPage';
import Profile from '../modules/profile/Profile';

const chatRoutes = [
  { path: 'index', element: <Home /> },
  { path: 'u/:id', element: <Profile /> },
  { path: 'c/:id', element: <ChatPage /> },
];

export default chatRoutes;
