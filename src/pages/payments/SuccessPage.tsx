import { walletApi } from '@/api';
import { useUserStore } from '@/config/store';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const coin = searchParams.get('coin'); // string
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const rechargeMutation = useMutation({
    mutationFn: async (coin: number) => {
      const { data } = await walletApi.rechargeWalletCoin(coin);
      return data;
    },
    onSuccess: (data) => {
      setUser({ coin: data.coin });
    },
  });

  useEffect(() => {
    if (!orderId || !amount || !paymentKey) {
      navigate('/');
      alert('비정상적인 접근입니다.');
    }
  }, [orderId, amount, paymentKey, navigate]);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        if (coin == null) {
          console.error('코인 정보가 없습니다.');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_PUBLIC_BASE_URL}/api/v1/payments/toss/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            payment_key: paymentKey,
            order_id: orderId,
            amount,
          }),
        });

        if (response.ok) {
          const parsedCoin = parseInt(coin);

          if (typeof parsedCoin !== 'number') {
            console.error('코인 값이 숫자가 아닙니다.');
            return;
          }

          rechargeMutation.mutate(parsedCoin);
          setUser({ coin: parsedCoin });
        }
      } catch (err) {
        console.error(err);
      }
    };
    confirmPayment();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto w-full max-w-2xl rounded-lg border bg-white p-6 shadow-lg'>
        <div className='mb-6 text-center'>
          <img
            width='100px'
            src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png'
            alt='결제 완료'
            className='mx-auto mb-4'
          />
          <h2 className='mb-2 text-3xl font-bold text-blue-700'>결제를 완료했어요</h2>
          <p className='text-gray-600'>아래 결제 정보를 확인해주세요.</p>
        </div>
        <div className='mb-6 grid grid-cols-2 gap-4'>
          <div className='text-left font-semibold'>결제금액</div>
          <div className='text-right'>{`${Number(amount).toLocaleString()}원`}</div>
          <div className='text-left font-semibold'>주문번호</div>
          <div className='text-right'>{orderId}</div>
          <div className='text-left font-semibold'>Payment Key</div>
          <div className='break-words text-right'>{paymentKey}</div>
        </div>
        <div className='mt-6 flex justify-center gap-4'>
          <Link to='/user/payments' replace={true}>
            <button className='rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50'>
              결제 내역
            </button>
          </Link>
          <Link to='/' replace={true}>
            <button className='rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50'>
              홈페이지 이동
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
