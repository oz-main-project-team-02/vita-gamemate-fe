import { client } from '@/api/client';
import TitleIntro from '@/components/Common/TitleIntro';
import MypageLayout from '@/layouts/MypageLayout';
import { useEffect, useState } from 'react';

interface PaymentResponse {
  requested_at: string;
  approved_at: string;
  amount: number;
  method: string;
  order_id: string;
  order_name: string;
  payment_key: string;
  user_nickname: string;
  status: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // FIX: 타입 지정 해야합니다.
        const { data }: { data: PaymentResponse[] } = await client.get('api/v1/payments/my/');
        setPayments(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <TitleIntro titleE={'MY ORDER'} titleK={'나의 의뢰'} content={'즐거운 매칭을 비타와 함께하세요!'} />
      <MypageLayout>
        <div className='mt-[140px] flex min-h-[calc(100dvh-597px)] justify-center'>
          <div>
            <h1 className='mb-4 text-4xl font-bold'>테스트 결제 내역</h1>
            <p className='mb-4 text-xl'>
              결제 내역 <span className='font-semibold text-yellow-600'>{payments.length}</span>건
            </p>
            <table role='table'>
              <thead className='border-y border-gray-400 bg-[#f2f4f6] text-left'>
                <tr role='row'>
                  <th className='px-3 py-1' role='columnheader'>
                    주문일시
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    결제일시
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    주문번호
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    결제상태
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    구매자명
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    결제액
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    결제수단
                  </th>
                  <th className='px-3 py-1' role='columnheader'>
                    구매상품
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment, i) => (
                  <tr key={i} className='border-y border-gray-400'>
                    <td className='px-3 py-1' role='cell'>
                      {payment.requested_at}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.approved_at}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.order_id}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.status}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.user_nickname}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.amount.toLocaleString()}원
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.method}
                    </td>
                    <td className='px-3 py-1' role='cell'>
                      {payment.order_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MypageLayout>
    </>
  );
}
