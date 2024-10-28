import TitleIntro from '@/components/Common/TitleIntro';
import CoinBox from '@/components/CoinPage/CoinBox';
import { CoinPackages } from '@/config/const';
import MypageLayout from '@/layouts/MypageLayout';

export default function CoinPage() {
  return (
    <>
      <TitleIntro titleE={'MY WALLET'} titleK={'나의 코인'} content={'소중한 시간을 비타와 함께하세요!'} />
      <MypageLayout>
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
      </MypageLayout>
    </>
  );
}
