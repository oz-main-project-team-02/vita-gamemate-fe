import { client } from '@/api/client';
import FilterList from '@/components/Common/FilterList';
import ProfileImg from '@/components/Common/ProfileImg';
import TitleIntro from '@/components/Common/TitleIntro';
import { useFilterListStore } from '@/config/store';
import { useEffect, useState } from 'react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const isFilterListOpen = useFilterListStore((state) => state.isFilterListOpen);
  const setIsFilterListToggle = useFilterListStore((state) => state.setIsFilterListToggle);

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
      <div className='h-full w-full'>
        <TitleIntro titleE={'MY ORDER'} titleK={'나의 의뢰'} content={'즐거운 매칭을 비타와 함께하세요!'} />
        <div className='flex h-full w-full transition-all duration-300 ease-in-out'>
          {/* 필터 섹션 */}
          <div
            className={`relative z-30 transition-all duration-300 ease-in-out ${
              isFilterListOpen ? 'max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]' : 'max-w-0'
            }`}
          >
            <FilterList isFilterListOpen={isFilterListOpen} setIsFilterListToggle={setIsFilterListToggle} />
          </div>
          {/* 메인 섹션 */}
          <div className={`relative flex-grow bg-gray-100 p-20 transition-all duration-300 ease-in-out`}>
            <ProfileImg />
            {/* 이벤트 배너 */}
            <div className='m-auto mt-[140px] max-w-[800px]'>
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
          </div>
        </div>
      </div>
    </div>
  );
}
