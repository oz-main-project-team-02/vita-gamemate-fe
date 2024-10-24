import '@/toss.css';
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
  console.log(coin);

  const rechargeMutation = useMutation({
    mutationFn: async (coin: number) => {
      const { data } = await walletApi.rechargeWalletCoin(coin);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
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
      // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
      // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
      // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
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
          console.log(parsedCoin);

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
    <>
      {/* box section  */}
      <div className='mx-auto mt-[30px] flex max-w-[800px] flex-col items-center rounded-lg bg-white p-[50px] text-center shadow-lg'>
        <img width='100px' src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' />
        <h2>결제를 완료했어요</h2>
        <div>
          <div className='p-grid typography--p' style={{ marginTop: '50px' }}>
            <div className='p-grid-col text--left'>
              <b>결제금액</b>
            </div>
            <div className='p-grid-col text--right' id='amount'>
              {`${Number(searchParams.get('amount')).toLocaleString()}원`}
            </div>
          </div>
          <div className='p-grid typography--p' style={{ marginTop: '10px' }}>
            <div className='p-grid-col text--left'>
              <b>주문번호</b>
            </div>
            <div className='p-grid-col text--right' id='orderId'>
              {`${searchParams.get('orderId')}`}
            </div>
          </div>
          <div className='p-grid typography--p' style={{ marginTop: '10px' }}>
            <div className='p-grid-col text--left'>
              <b>paymentKey</b>
            </div>
            <div className='p-grid-col text--right' id='paymentKey' style={{ whiteSpace: 'initial', width: '250px' }}>
              {`${searchParams.get('paymentKey')}`}
            </div>
          </div>
          <div className='p-grid-col'>
            <Link to='https://docs.tosspayments.com/guides/v2/payment-widget/integration'>
              <button className='button p-grid-col5'>연동 문서</button>
            </Link>
            <Link to='https://discord.gg/A4fRFXQhRu'>
              <button className='button p-grid-col5' style={{ backgroundColor: '#e8f3ff', color: '#1b64da' }}>
                실시간 문의
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
