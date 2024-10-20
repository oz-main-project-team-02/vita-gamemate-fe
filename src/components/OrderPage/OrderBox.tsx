import { useState } from 'react';
import Gender from '../Common/Gender';
import OnlineFlag from '../Common/OnlineFlag';
import Review from './Review';

interface ReviewProps {
  review: boolean;
}

export default function OrderBox({ review }: ReviewProps) {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className='mt-[38px] flex h-[213px] w-full rounded-xl border border-gray-200 bg-[#FFFFFF] px-[37px] py-[25px]'>
      <div className='h-[163px] w-[163px] rounded-3xl border border-gray-200 bg-[#F8F8F8]'>
        <img className='h-[160px] w-[160px] p-1' src='/src/assets/imgs/user.png' alt='user' />
      </div>
      <div className='mx-8 h-[163px] w-1/2 py-2'>
        <p className='text-base'>닉네임</p>
        <div className='relative mb-[42px] mt-1 flex h-[20px] w-full items-start'>
          <Gender gender={'male'} birthday={null} />
          <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>
            <OnlineFlag />
          </div>
        </div>
        <p className='mb-1'>의뢰 신청 : 2024 - 10 - 11 - 11시 22분</p>
        <p>총 개수 : 1</p>
      </div>
      {review && (
        <button
          onClick={() => setShowReview(true)}
          className='ml-[50px] mt-[50px] h-[50px] w-[15%] rounded-xl bg-gradient-to-r from-primary to-limeGreen text-[20px] font-semibold'
        >
          리뷰쓰기
        </button>
      )}
      {showReview && <Review setShowReview={setShowReview} />}
    </div>
  );
}
