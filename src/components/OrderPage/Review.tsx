import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewProps {
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Review({ setShowReview }: ReviewProps) {
  const [review, setReview] = useState({
    description: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(review);
    setShowReview(false);
  };

  return (
    <>
      <div className='fixed left-0 top-0 z-10 h-screen w-screen bg-[#000000] bg-opacity-50'></div>
      <form
        onSubmit={handleSubmit}
        className='absolute right-[290px] top-[-40px] z-20 h-[373px] w-full rounded-3xl bg-[#FFFFFF] px-[41px] py-[33px]'
      >
        <h1 className='text-lg font-extrabold'>리뷰 작성하기</h1>
        <p className='mb-1 text-sm text-gray-300'>행복했던 순간을 나눠주세요!</p>
        <div className='flex text-base'>
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-slate-100' />
        </div>
        <input
          value={review.description}
          onChange={(e) => setReview({ ...review, description: e.target.value })}
          className='mt-[12px] h-[181px] w-full rounded-2xl border pb-28 pt-1 indent-6 focus:outline-none'
          placeholder='재미있었어요!'
        />
        <button
          type='submit'
          className='float-right mt-[18px] h-[38px] w-[185px] rounded-xl border border-gray-300 bg-[#D9D9D9]'
        >
          제출하기
        </button>
        <button onClick={() => setShowReview(false)} className='absolute right-[60px] top-[35px] text-gray-400'>
          ✕
        </button>
      </form>
    </>
  );
}
