import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import CoinBox from '../../components/CoinPage/CoinBox';
import { CoinPackages } from '@/config/const';
import FilterList from '@/components/Common/FilterList';
import { useFilterListStore } from '@/config/store';

export default function CoinPage() {
  const isFilterListOpen = useFilterListStore((state) => state.isFilterListOpen);
  const setIsFilterListToggle = useFilterListStore((state) => state.setIsFilterListToggle);

  return (
    <div className='h-full w-full'>
      <TitleIntro titleE={'MY WALLET'} titleK={'나의 코인'} content={'소중한 시간을 비타와 함께하세요!'} />
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
    </div>
  );
}
