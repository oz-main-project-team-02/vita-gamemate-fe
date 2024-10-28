import TitleIntro from '../../components/Common/TitleIntro';
import ProfileImg from '../../components/Common/ProfileImg';
import CoinBox from '../../components/CoinPage/CoinBox';
import { CoinPackages } from '@/config/const';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/config/store';
import { authApi } from '@/api';
import classNames from 'classnames';

export default function CoinPage() {
  const { unSetUser } = useUserStore();
  const navigate = useNavigate();

  const getNavigateClass = (path: string) => {
    return classNames('my-3 text-base hover:text-[#3A3A3A] cursor-pointer', {
      'text-[#3A3A3A]': location.pathname === path,
      'text-[#898989]': location.pathname !== path,
    });
  };

  const handleLogoutClick = async () => {
    try {
      const response = await authApi.logout();

      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        unSetUser();
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TitleIntro titleE={'MY WALLET'} titleK={'나의 코인'} content={'소중한 시간을 비타와 함께하세요!'} />
      <div className='flex w-full'>
        {/* 필터 섹션 */}
        <div className='flex w-[300px] flex-col items-end bg-[#e2e2e2] p-10 lg:w-[350px] xl:w-[400px]'>
          <div className='w-2/3'>
            <p className={getNavigateClass('/user/edit-info')} onClick={() => navigate('/user/edit-info')}>
              <big>
                <strong>/</strong>
              </big>{' '}
              &nbsp;프로필
            </p>
            <p className={getNavigateClass('/user/gamemate')} onClick={() => navigate('/user/gamemate')}>
              <big>
                <strong>/</strong>
              </big>{' '}
              &nbsp;게임 메이트 등록
            </p>
            <p className={getNavigateClass('/user/coin')} onClick={() => navigate('/user/coin')}>
              <big>
                <strong>/</strong>
              </big>{' '}
              &nbsp;코인
            </p>
            <p className={getNavigateClass('/user/orders')} onClick={() => navigate('/user/orders')}>
              <big>
                <strong>/</strong>
              </big>{' '}
              &nbsp;내 의뢰
            </p>
            <br />
            <hr className='h-[1px] border-0 bg-[#898989]' />
            <br />
            <p onClick={handleLogoutClick} className='mt-3 cursor-pointer text-[#898989] hover:text-[#3A3A3A]'>
              로그아웃
            </p>
          </div>
        </div>

        {/* 메인 섹션 */}
        <div className='relative flex-grow bg-gray-100 p-20'>
          <ProfileImg />
          {/* 이벤트 배너 */}
          <div className='mt-[140px]'>
            <button className='mb-[55px] h-[90px] w-full cursor-pointer rounded-xl bg-[#FF7A7A] text-3xl text-[#FFFFFF] lg:h-[110px] lg:text-4xl xl:h-[130px] xl:text-5xl'>
              첫 결제 혜택
            </button>

            <div
              className='grid w-full justify-center gap-4'
              style={{
                gridTemplateColumns: 'repeat(auto-fit, 200px)',
              }}
            >
              {CoinPackages.map((coinData) => (
                <CoinBox key={coinData.coin} coinData={coinData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
