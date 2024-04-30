import { describe, test, expect } from 'vitest';
import { Route } from 'react-router-dom';

import routesComeback from './routesComeback';
import Login from '@auth/pages/login/Login';

const indexRoute = [{ path: 'index', element: <Login /> }];
const loginRoute = [{ path: 'login', element: <Login /> }];
const indexAndLoginRoute = indexRoute.concat(loginRoute);

const indexAndLoginRouteTestRes = [
  <Route index element={<Login />} key={0} />,
  <Route path='login' element={<Login />} key={1} />,
];

describe('[GLOBAL_UTILS] routesComeback Test', () => {
  test('Index Route', () => {
    expect(routesComeback(indexRoute)[0]).toEqual(
      <Route index element={<Login />} key={0} />
    );
  });
  test('Login Route', () => {
    expect(routesComeback(loginRoute)[0]).toEqual(
      <Route path='login' element={<Login />} key={0} />
    );
  });
  test('Index and Login Route', () => {
    expect(routesComeback(indexAndLoginRoute)).toEqual(
      indexAndLoginRouteTestRes
    );
  });
});
