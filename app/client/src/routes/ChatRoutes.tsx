import Home from '@chat/pages/home/Home';
import ChatPage from '@chat/pages/chat/ChatPage';
import Profile from '@profile/Profile';

const chatRoutes = [
  { path: 'index', element: <Home /> },
  { path: 'user/:id', element: <Profile /> },
  { path: 'chat/:id', element: <ChatPage /> },
];

export default chatRoutes;
