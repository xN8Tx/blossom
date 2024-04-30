import Home from '@contact/pages/home/Home';
import Profile from '@profile/Profile';

const contactRoutes = [
  { path: 'index', element: <Home /> },
  { path: 'user/:id', element: <Profile /> },
];

export default contactRoutes;
