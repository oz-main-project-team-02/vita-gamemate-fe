import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import CoinBox from '../../components/CoinPage/CoinBox';
import { CoinPackages } from '@/config/const';
import FilterList from '@/components/Common/FilterList';

export default function CoinPage() {
  return (
    <>
      <TitleIntro titleE={'MY WALLET'} titleK={'나의 코인'} content={'소중한 시간을 비타와 함께하세요!'} />
      <div className='flex w-full'>
        {/* 필터 섹션 */}
        <FilterList />

        {/* 메인 섹션 */}
        <div className='relative flex-grow bg-gray-100 p-20'>
          <ProfileImg />
          {/* 이벤트 배너 */}
          <div className='mt-[140px]'>
            <button className='mb-[55px] h-[90px] w-full cursor-pointer rounded-xl bg-[#FF7A7A] text-3xl text-[#FFFFFF] lg:h-[110px] lg:text-4xl xl:h-[130px] xl:text-5xl'>
              첫 결제 혜택
            </button>

            <div
              className='grid w-full justify-center gap-4'
              style={{
                gridTemplateColumns: 'repeat(auto-fit, 200px)',
              }}
            >
              {CoinPackages.map((coinData) => (
                <CoinBox key={coinData.coin} coinData={coinData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
