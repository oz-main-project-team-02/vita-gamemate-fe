import { Route, Routes } from 'react-router-dom';
import './global.css';
import VitaPrivateRoute from './routes/VitaPrivateRoute';
import { privateRoutes, publicRoutes } from './routes/routes';
import { ReactNode } from 'react';

function App() {
  return (
    <Routes>
      <Route element={<VitaPrivateRoute />}>
        {privateRoutes.map((route: { path: string; element: ReactNode }, i: number) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Route>
      {publicRoutes.map((route: { path: string; element: ReactNode }, i: number) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
