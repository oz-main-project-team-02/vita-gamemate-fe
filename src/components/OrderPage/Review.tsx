import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewProps {
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Review({setShowReview}: ReviewProps) {
  const [review, setReview] = useState({
    description: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(review)
    setShowReview(false)
  }
  
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-opacity-50 bg-[#000000] z-10"></div>
      <form onSubmit={handleSubmit} className="w-full h-[373px] px-[41px] py-[33px] absolute top-[-40px] right-[290px] rounded-3xl bg-[#FFFFFF] z-20">
        <h1 className='font-extrabold text-lg'>리뷰 작성하기</h1>
        <p className='mb-1 text-sm text-gray-300'>행복했던 순간을 나눠주세요!</p>
        <div className='flex text-base'>
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-[#FFBB33]' />
          <FaStar className='m-[3px] text-slate-100' />
        </div>
        <input value={review.description} onChange={(e) => setReview({...review, description: e.target.value})} className='w-full h-[181px] mt-[12px] pt-1 pb-28 border rounded-2xl indent-6 focus:outline-none' placeholder='재미있었어요!' />
        <button type='submit' className='w-[185px] h-[38px] mt-[18px] float-right border rounded-xl border-gray-300 bg-[#D9D9D9]'>제출하기</button>
        <button onClick={() => setShowReview(false)} className='absolute top-[35px] right-[60px] text-gray-400'>✕</button>
      </form>
    </>
  )
}
