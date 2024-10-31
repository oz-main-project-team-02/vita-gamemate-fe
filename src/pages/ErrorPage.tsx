import { useNavigate } from 'react-router-dom';
import errorImage from '@/assets/imgs/404.png';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className='h-[2015px] w-full bg-primary pt-[70px]'>
        <div className='flex h-[1866px] w-full flex-col items-center bg-gray-100 pt-16'>
          <img className='w-[40%]' src={errorImage} alt='404 notFound' />
          <p className='text-2xl text-blue-400'>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</p>
          <br />
          <p className='my-3'>존재하지 않는 주소를 입력하셨거나,</p>
          <p className='my-3'>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
          <div className='my-5'>
            <button onClick={() => navigate('/')} className='mx-1 h-[40px] w-[100px] border-2 hover:bg-gray-200'>
              메인으로
            </button>
            <button onClick={() => navigate(-1)} className='mx-1 h-[40px] w-[100px] border-2 hover:bg-gray-200'>
              이전 페이지
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
