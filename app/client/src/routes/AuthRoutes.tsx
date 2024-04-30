import Code from '@/modules/auth/pages/code/Code';
import Login from '@/modules/auth/pages/login/Login';
import Registration from '@/modules/auth/pages/registration/Registration';

const authRoutes = [
  { path: 'index', element: <Login /> },
  { path: 'registration', element: <Registration /> },
  { path: 'code', element: <Code /> },
];

export default authRoutes;
