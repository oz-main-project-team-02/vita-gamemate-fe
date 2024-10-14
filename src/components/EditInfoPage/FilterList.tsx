import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterList() {
  const location = useLocation()
  const navigate = useNavigate()

  const getNavigateClass = (path: string) => {
    return classNames(
      'my-3 text-base hover:text-[#3A3A3A] cursor-pointer',{
        'text-[#3A3A3A]': location.pathname === path,
        'text-[#898989]': location.pathname !== path
      }
    )
  }

  return (
    <div className="w-1/2 h-[400px] mr-[80px] flex flex-col justify-end">
      <p className={getNavigateClass('/user/edit-info')} 
      onClick={() => navigate('/user/edit-info')}><big><strong>/</strong></big>{" "}&nbsp;프로필</p>
      <p className={getNavigateClass('/user/gamemate')} 
      onClick={() => navigate('/user/gamemate')}><big><strong>/</strong></big>{" "}&nbsp;게임 메이트 등록</p>
      <p className={getNavigateClass('/user/coin')} 
      onClick={() => navigate('/coin')}><big><strong>/</strong></big>{" "}&nbsp;코인</p>
      <p className={getNavigateClass('/user/orders')} 
      onClick={() => navigate('/user/orders')}><big><strong>/</strong></big>{" "}&nbsp;내 의뢰</p>
      <br />
      <hr className='h-[1px] border-0 bg-[#898989]' />
      <br />
      <p className="mt-3 text-[#898989] hover:text-[#3A3A3A] cursor-pointer" >로그아웃</p>
    </div>
  );
}
