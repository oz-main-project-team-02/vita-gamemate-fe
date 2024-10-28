import { CoinPackage } from '@/config/const';
import { useNavigate } from 'react-router-dom';

type Props = {
  coinData: CoinPackage;
};

export default function CoinBox({ coinData }: Props) {
  const navigate = useNavigate();

  const handlePaymentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        coinData,
      },
    });
  };

  return (
    <div
      key={coinData.coin}
      onClick={(e) => handlePaymentClick(e)}
      className='flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-200 bg-[#F8F8F8] p-4 hover:shadow-md'
      style={{ width: '200px', margin: '0 auto' }}
    >
      <div className='flex w-full justify-end'>
        <div className='rounded-bl-xl rounded-tr-xl bg-purple px-2 py-1 text-center text-sm font-medium text-[#FFFFFF]'>
          {coinData.discountRate}% OFF
        </div>
      </div>
      <div className='flex items-center'>
        <img src='/src/assets/imgs/vitaCoin.svg' alt='vitaCoin' width={24} height={24} className='mr-2' />
        <h1 className='text-2xl font-semibold text-yellow-600'>{coinData.coin.toLocaleString()}</h1>
      </div>
      <div className='my-2 w-3/4 border-t-2 border-dashed border-gray-300'></div>
      <p className='text-base font-semibold text-gray-500'>₩ {coinData.discountPrice.toLocaleString()}</p>
      <p className='text-xs font-semibold text-gray-300 line-through'>₩ {coinData.price.toLocaleString()}</p>
    </div>
  );
}
