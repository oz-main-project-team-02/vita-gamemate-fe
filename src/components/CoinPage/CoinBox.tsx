export default function CoinBox() {
  return (
    <div className="w-[163px] h-[163px] p-[29px] flex flex-col items-center border rounded-xl border-gray-200 bg-[#F8F8F8]">
      <div className="w-[60px] h-[23px] mt-[-29px] ml-[103px] pt-1 pl-[5px] rounded-bl-xl rounded-tr-xl absolute bg-purple font-medium text-xs text-[#FFFFFF]">20% OFF</div>
      <div className="mb-[13px] flex items-center">
        <img className="w-[24px] h-[24px] mr-2 rounded-full" src="../../../public/vitaLogo.png" alt="vitaLogo" />
        <h1 className="font-semibold text-2xl text-primary">500</h1>
      </div>
      <div className="mb-[13px] border-t-2 border-dashed border-gray-300 w-full"></div>
      <p className="font-semibold text-base text-gray-500">₩ 4,200</p>
      <p className="text-xs font-semibold text-gray-300 line-through">₩ 5,000</p>
    </div>
  )
}