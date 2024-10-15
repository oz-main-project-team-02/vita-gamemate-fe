import OnlineFlag from "./OnlineFlag";
import VitaPrice from "./VitaPrice";

export default function MateCard() {
  return (
    <div className='relative flex flex-col items-center justify-center w-[206px] h-[288px] rounded-3xl shadow-lg overflow-hidden leading-[1.3]'>
      <OnlineFlag />
      <div className='w-[206px] h-[206px] bg-blue-500 overflow-hidden'>
        <img
          src='/src/assets/imgs/user.png'
          alt=''
          className='w-[206px] hover:scale-125 overflow-hidden transition-transform duration-200'
        />
      </div>
      <div className='w-[206px] h-[82px] px-4 py-2'>
        <h2>닉네임</h2>
        <p className='flex items-center'>
          <img
            src='/src/assets/imgs/star.svg'
            alt='리뷰 별점 아이콘'
            className='w-[18px] h-[18px]'
          />
          &nbsp;5.00&nbsp;
          <span className='text-gray-300 text-sm'>| 받은 의뢰수 10</span>
        </p>
        <VitaPrice />
      </div>
    </div>
  );
}
