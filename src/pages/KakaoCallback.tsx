import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client } from '../api/client';
import { useUserStore } from '../config/store';
import { User, Wallet } from '../config/types';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const kakaoCode = searchParams.get('code');
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await client.post('/api/v1/users/kakao/login/callback/', {
          code: kakaoCode,
        });
        const { data }: { data: User } = await client.get(`/api/v1/users/${response.data.id}/profile`);
        localStorage.setItem('accessToken', response.data.access_token);
        setUser(data);
        const { data: coin }: { data: Wallet } = await client.get('/api/v1/wallets/coin/');
        setUser({ coin: coin.coin }); // 사용자 지갑 업데이트
        navigate('/', { replace: true });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [kakaoCode, navigate, setUser]);

  return <></>;
}
