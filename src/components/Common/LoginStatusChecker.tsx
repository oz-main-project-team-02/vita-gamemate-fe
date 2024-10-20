import { client } from '@/api/client';
import { useUserStore } from '@/config/store';
import { User } from '@/config/types';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function LoginStatusChecker({ children }: Props) {
  const { setUser, unSetUser } = useUserStore();
  // 로딩중 상태처리를 안해주면, PrivateRoute에서 사용자정보가 업데이트 되기전
  // user.id에서 0의 상태가 먼저 출력되어 비정상적인 로그인 실패가 이루어질 수 있음
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      (async () => {
        try {
          const { data }: { data: User } = await client.get('/api/v1/users/profile/me/');
          console.log('data:', data);
          setUser(data);
        } catch (err) {
          console.error(err);
          unSetUser();
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, [setUser, unSetUser]);
  if (isLoading) return;

  return <>{children}</>;
}
