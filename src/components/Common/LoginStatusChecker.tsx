import { userApi, walletApi } from '@/api';
import { useUserStore } from '@/config/store';
import { User, Wallet } from '@/config/types';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function LoginStatusChecker({ children }: Props) {
  const { user, setUser, unSetUser } = useUserStore();
  // 로딩중 상태처리를 안해주면, PrivateRoute에서 사용자정보가 업데이트 되기전
  // user.id에서 0의 상태가 먼저 출력되어 비정상적인 로그인 실패가 이루어질 수 있음
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const socket: WebSocket = new WebSocket(`wss://resdineconsulting.com/ws/status/?token=${accessToken}`);

    socket.onopen = () => {
      console.log('소켓 연결 성공');
    };

    return () => {
      socket.close();
      console.log('소켓 연결 종료');
    };
  }, [user.id]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      (async () => {
        try {
          const { data } = await userApi.fetchMyProfile();
          const { data: user }: { data: User } = await userApi.fetchUserProfileById(data.id);
          const { data: coin }: { data: Wallet } = await walletApi.fetchMyWalletCoins();

          setUser(user); // 사용자 정보 업데이트
          setUser({ coin: coin.coin }); // 사용자 지갑 업데이트
        } catch (err) {
          console.error(err);
          unSetUser(); // 사용자 정보 초기화
          localStorage.removeItem('accessToken');
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
