import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../config/store';
import { User, Wallet } from '../config/types';
import { authApi, userApi, walletApi } from '@/api';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const kakaoCode = searchParams.get('code');
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authApi.kakaoLogin(kakaoCode);
        localStorage.setItem('accessToken', data.access_token);

        const { data: user }: { data: User } = await userApi.fetchUserProfileById(data.id);
        setUser(user); // 사용자 정보 업데이트

        const { data: coin }: { data: Wallet } = await walletApi.fetchMyWalletCoins();
        setUser({ coin: coin.coin }); // 사용자 지갑 업데이트
        navigate('/', { replace: true });
      } catch (err) {
        console.error(err);
        navigate('/', { replace: true });
      }
    })();
  }, [kakaoCode, navigate, setUser]);

  return <></>;
}
