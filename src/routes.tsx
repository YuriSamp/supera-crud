import { Route, Routes as BrowserRoutes } from 'react-router-dom';

import Create from './pages/create';
import Edit from './pages/edit';
import Visualize from './pages/visualize';
import Home from './pages/home';


const Routes = () => {

  return (
    <BrowserRoutes >
      <Route
        path='/'
        element={
          <Home />
        }
      />
      <Route
        path='/create'
        element={
          <Create />
        }
      />
      <Route
        path='/edit/:id'
        element={
          <Edit />
        }
      />
      <Route
        path='/visualize/:id'
        element={
          <Visualize />
        }
      />
    </BrowserRoutes>
  );
};

export default Routes;
