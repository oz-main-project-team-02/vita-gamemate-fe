import Gender from "../Common/Gender";

export default function OrderBox() {
  return (
    <div className="w-full h-[213px] mt-[38px] px-[37px] py-[25px] flex border rounded-xl border-gray-200 bg-[#FFFFFF]">
      <div className="w-[163px] h-[163px] border rounded-3xl border-gray-200 bg-[#F8F8F8]">
        <img className="" src="../../../public/vitaLogo.png" alt="vitaLogo" />
      </div>
      <div className="w-1/2 h-[163px] mx-8 py-2">
        <p className="text-base">닉네임</p>
        <div className="w-[114px] h-[19px] mt-1 mb-[42px] flex justify-between">
          <Gender gender={'male'} age={26} />
          <div className="w-[59px] h-[19px] px-2 flex items-center rounded-xl bg-mintGreen text-[#FFFFFF] font-medium text-xs">•{" "}온라인</div>
        </div>
        <p className="mb-1">의뢰 신청 : 2024 - 10 - 11 - 11시 22분</p>
        <p>총 개수 : 1</p>
      </div>
      <button className="w-[15%] h-[50px] mt-[50px] ml-[50px] rounded-xl bg-gradient-to-r from-primary to-limeGreen font-semibold text-[20px]">리뷰쓰기</button>
    </div>
  )
}
