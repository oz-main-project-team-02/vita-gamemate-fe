import FilterList from '../../components/Common/FilterList';
import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import CoinBox from '../../components/CoinPage/CoinBox';
import { CoinPackages } from '@/config/const';

export default function CoinPage() {
  return (
    <>
      <div className='w-full'>
        <TitleIntro titleE={'MY WALLET'} titleK={'나의 코인'} content={'소중한 시간을 비타와 함께하세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          <ProfileImg />
          <div className='absolute left-[40.5%] top-[260px] h-[704px] w-[50%]'>
            <button className='mb-[55px] h-[130px] w-full cursor-pointer rounded-xl bg-[#FF7A7A] text-5xl text-[#FFFFFF]'>
              첫 결제 혜택
            </button>

            <p className='pb-[5px] text-2xl font-bold text-gray-500'>닉네임</p>
            <div className='grid w-full grid-cols-4 gap-[39px] rounded-xl border border-gray-200 bg-[#FFFFFF] px-[65px] py-[58px]'>
              {CoinPackages.map((coinData) => (
                <CoinBox coinData={coinData} />
              ))}
            </div>
          </div>
          <div className='absolute flex h-[1866px] w-[30%] justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </>
  );
}
