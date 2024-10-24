import FilterList from '../../components/Common/FilterList';
import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import Request from '../../components/OrderPage/Request';
import Response from '../../components/OrderPage/Response';
import { useState } from 'react';

export default function OrdersPage() {
  const [selectButton, setSelectButton] = useState('request');

  return (
    <>
      <div className='h-[4105px] w-full'>
        <TitleIntro titleE={'MY ORDER'} titleK={'나의 의뢰'} content={'즐거운 매칭을 비타와 함께하세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          <ProfileImg />
          <div className='absolute left-[40.5%] top-[260px] h-[1500px] w-[50%]'>
            <p className='pb-[26px] text-2xl font-bold text-gray-500'>닉네임</p>
            <button
              onClick={() => setSelectButton(() => 'request')}
              className={`h-[50px] w-[149px] ${
                selectButton === 'request' ? 'bg-primary' : ''
              } text-2xl font-extrabold active:bg-primary`}
            >
              나의 주문
            </button>
            <button
              onClick={() => setSelectButton(() => 'response')}
              className={`h-[50px] w-[214px] ${
                selectButton === 'response' ? 'bg-primary' : ''
              } text-2xl font-extrabold active:bg-primary`}
            >
              주문을 받았습니다
            </button>
            <hr className='h-[1px] border-[1px]' />
            {selectButton === 'request' ? <Request /> : <Response />}
          </div>
          <div className='absolute flex h-[1866px] w-[30%] justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </>
  );
}
