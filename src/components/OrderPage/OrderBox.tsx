import { useState } from "react";
import Gender from "../Common/Gender";
import OnlineFlag from "../Common/OnlineFlag";
import Review from "./Review";

interface ReviewProps {
  review: boolean
}

export default function OrderBox({review}: ReviewProps) {
  const [showReview, setShowReview] = useState(false)

  return (
    <div className="w-full h-[213px] mt-[38px] px-[37px] py-[25px] flex border rounded-xl border-gray-200 bg-[#FFFFFF]">
      <div className="w-[163px] h-[163px] border rounded-3xl border-gray-200 bg-[#F8F8F8]">
        <img className="w-[160px] h-[160px] p-1" src="/src/assets/imgs/user.png" alt="user" />
      </div>
      <div className="w-1/2 h-[163px] mx-8 py-2">
        <p className="text-base">닉네임</p>
        <div className="w-[142px] h-[19px] mt-1 mb-[42px] flex justify-between">
          <Gender gender={'male'} age={26} />
          <div className="w-[100px] mt-[-9px] relative"><OnlineFlag /></div>
        </div>
        <p className="mb-1">의뢰 신청 : 2024 - 10 - 11 - 11시 22분</p>
        <p>총 개수 : 1</p>
      </div>
      {review && <button onClick={() => setShowReview(true)} 
      className="w-[15%] h-[50px] mt-[50px] ml-[50px] rounded-xl bg-gradient-to-r from-primary to-limeGreen font-semibold text-[20px]">리뷰쓰기</button>}
      {showReview && <Review setShowReview={setShowReview} />}
    </div>
  )
}
