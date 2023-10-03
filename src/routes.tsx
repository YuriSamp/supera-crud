import { Route, Routes as BrowserRoutes } from 'react-router-dom';

import Create from './pages/create';
import Edit from './pages/edit';
import Visualize from './pages/visualize';
import { ROUTES } from './config/routes';
import Home from './pages/Home';

const RoutesList = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.CREATE, element: <Create /> },
  { path: ROUTES.EDIT, element: <Edit /> },
  { path: ROUTES.VISUALIZE, element: <Visualize /> }
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
