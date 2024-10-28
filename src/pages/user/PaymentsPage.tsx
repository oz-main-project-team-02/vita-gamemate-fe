import { client } from '@/api/client';
import { useEffect, useState } from 'react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // FIX: 타입 지정 해야합니다.
        const { data } = await client.get('api/v1/payments/my/');
        console.log(data);
        setPayments(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>결제 내역</h1>
      <div>결제 내역 7건</div>
      <table role='table'>
        <thead>
          <tr role='row'>
            <th role='columnheader'>주문일시</th>
            <th role='columnheader'>결제일시</th>
            <th role='columnheader'>주문번호</th>
            <th role='columnheader'>결제상태</th>
            <th role='columnheader'>구매자명</th>
            <th role='columnheader'>결제액</th>
            <th role='columnheader'>결제수단</th>
            <th role='columnheader'>구매상품</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, i) => (
            <tr key={i}>
              <td role='cell'>1</td>
              <td role='cell'>2</td>
              <td role='cell'>3</td>
              <td role='cell'>4</td>
              <td role='cell'>5</td>
              <td role='cell'>6</td>
              <td role='cell'>7</td>
              <td role='cell'>8</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
