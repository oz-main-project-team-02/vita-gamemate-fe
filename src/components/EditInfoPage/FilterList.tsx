import { useNavigate } from "react-router-dom";

export default function FilterList() {
  const navigate = useNavigate();

  return (
    <div className='w-1/2 h-[400px] mr-[60px] flex flex-col justify-end text-base text-[#898989]'>
      <p className='my-3' onClick={() => navigate("/user/edit-info")}>
        <big>
          <strong>/</strong>
        </big>{" "}
        &nbsp;프로필
      </p>
      <p className='my-3' onClick={() => navigate("/user/gamemate")}>
        <big>
          <strong>/</strong>
        </big>{" "}
        &nbsp;게임 메이트 등록
      </p>
      <p className='my-3' onClick={() => navigate("/coin")}>
        <big>
          <strong>/</strong>
        </big>{" "}
        &nbsp;코인
      </p>
      <p className='my-3' onClick={() => navigate("/user/orders")}>
        <big>
          <strong>/</strong>
        </big>{" "}
        &nbsp;내 의뢰
      </p>
      <br />
      <hr className='h-[1px] border-0 bg-[#898989]' />
      <br />
      <p className='mt-3'>로그아웃</p>
    </div>
  );
}
