import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function VitaPrivateRoute() {
  const accessToken = useMemo(() => {
    return localStorage.getItem('accessToken');
  }, []);

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
}
