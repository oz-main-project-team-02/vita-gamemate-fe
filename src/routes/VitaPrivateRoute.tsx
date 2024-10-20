import { client } from '@/api/client';
import { useUserStore } from '@/config/store';
import { useEffect, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function VitaPrivateRoute() {
  const { user, setUser } = useUserStore();

  // 액세스 토큰 있을 경우, 사용자 정보 가져오기
  useEffect(() => {
    if (user.id === 0) {
      (async () => {
        try {
          const { data } = await client.get('/api/v1/users/profile/me/');
          setUser(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [setUser, user.id]);

  const accessToken = useMemo(() => {
    return localStorage.getItem('accessToken');
  }, []);

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
}
