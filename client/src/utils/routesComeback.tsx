import { Route } from 'react-router-dom';

type Route = {
  path: string;
  element: JSX.Element;
};

const routesComeback = (routes: Array<Route>) => {
  return routes.map((route, index) => {
    if (route.path === 'index') {
      return <Route index element={route.element} key={index} />;
    }
    return <Route path={route.path} element={route.element} key={index} />;
  });
};

export default routesComeback;
