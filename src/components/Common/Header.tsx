import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

export default function Header() {
  return (
    <div className='flex items-center justify-between px-12'>
      <div className='flex gap-6 font-semibold text-primaryTextLight'>
        <Link to={"/"}>
          <div className='hover:text-primaryText'>홈페이지</div>
        </Link>
        <div className='hover:text-primaryText'>모든 서비스</div>
      </div>
      <div className='text-[48px] font-bold'>
        VI<span className='text-white'>TA</span>
      </div>
      <div className='flex gap-6'>
        <div className='flex items-center '>
          <button className='text-primaryTextLight font-semibold hover:text-primaryText'>
            로그인
          </button>
        </div>
        <div className='flex items-center border-b border-b-primaryText'>
          <input
            type='search'
            className='bg-transparent border-none focus:outline-none p-1 w-24'
          />
          <IoSearchSharp />
        </div>
      </div>
    </div>
  );
}
