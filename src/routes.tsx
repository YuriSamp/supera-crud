import { Route, Routes as BrowserRoutes } from 'react-router-dom';

import Create from './pages/create';
import Edit from './pages/edit';
import Visualize from './pages/visualize';
import Home from './pages/home';

const RoutesList = [
  { path: '/', element: <Home /> },
  { path: '/create', element: <Create /> },
  { path: '/edit/:id', element: <Edit /> },
  { path: '/visualize/:id', element: <Visualize /> }
]

const Routes = () => {
  return (
    <BrowserRoutes >
      {RoutesList.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </BrowserRoutes>
  );
};

export default Routes;
