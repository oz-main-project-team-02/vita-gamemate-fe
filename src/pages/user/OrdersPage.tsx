import FilterList from '../../components/Common/FilterList';
import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import Request from '../../components/OrderPage/Request';
import Response from '../../components/OrderPage/Response';
import { useState } from 'react';
import { useFilterListStore } from '@/config/store';

export default function OrdersPage() {
  const [selectButton, setSelectButton] = useState('request');
  const isFilterListOpen = useFilterListStore((state) => state.isFilterListOpen);
  const setIsFilterListToggle = useFilterListStore((state) => state.setIsFilterListToggle);

  return (
    <>
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
              <div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
