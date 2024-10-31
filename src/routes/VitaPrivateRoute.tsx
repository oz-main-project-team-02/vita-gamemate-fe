import { useUserStore } from '@/config/store';
import { Navigate, Outlet } from 'react-router-dom';

export default function VitaPrivateRoute() {
  const { user } = useUserStore();
  if (user.id !== 0 && localStorage.getItem('accessToken')) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
}
