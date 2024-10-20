import { AiOutlineMessage } from 'react-icons/ai';
import { MdNotes } from 'react-icons/md';
import { PiCrownSimpleFill } from 'react-icons/pi';
import Gender from '@/components/Common/Gender';
import OnlineFlag from '@/components/Common/OnlineFlag';
import TitleIntro from '@/components/Common/TitleIntro';
import CommonLayout from '@/layouts/CommonLayout';
import UserRanking from '@/components/UserDetailPage/UserRanking';
import VitaPrice from '@/components/Common/VitaPrice';
import lol from '@/assets/imgs/lol.png';
import ReviewList from '@/components/UserDetailPage/ReviewList';
import { GameMate } from '@/config/types';

export default function UserDetailPage() {
  const mate: GameMate = {
    id: 1,
    nickname: 'Summoner123',
    email: 'summoner123@example.com',
    gender: 'male',
    description: '즐겁게 게임할 파트너를 찾고 있습니다.',
    birthday: '1995-08-15',
    profile_image: 'https://picsum.photos/200/300?random=1',
    is_mate: true,
    is_online: true,
    game_id: 1,
    level: 'Diamond',
    price: 9999,
    average_rating: 4,
    amount: 500,
  };

  return (
    <CommonLayout>
      <div className='h-[4105px] w-full'>
        <TitleIntro titleE={'Vita User'} titleK={'사용자 정보'} content={'비타 유저를 구경하세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100 pt-[93px]'>
          <div className='mx-auto mb-[48px] flex h-[127px] w-7/12 min-w-[600px] rounded-3xl border bg-[#FFFFFF] px-[37px] py-[27px]'>
            <div className='h-[70px] w-[70px] rounded-full border bg-slate-50'>
              <img
                className='h-[70px] w-[70px] rounded-full object-cover'
                src={mate.profile_image !== null || undefined ? mate.profile_image! : '/src/assets/imgs/user.png'}
                alt='user'
              />
            </div>
            <div className='mx-6 flex h-[75px] w-[900px] flex-col'>
              <p className='mb-[1px]'>{mate.nickname}</p>
              <div className='relative flex h-[20px] w-full items-start'>
                {mate.gender !== null ? <Gender gender={mate.gender!} birthday={mate.birthday} /> : null}
                <div className='relative ml-[-8px] mt-[-9px] w-[100px]'>{mate.is_online ? <OnlineFlag /> : null}</div>
              </div>
              <div className='mt-2 flex items-center'>
                <div className='h-[19px] w-[53px] rounded-xl bg-gray-200 px-[10px] text-sm text-[#FFFFFF]'>email</div>
                <p className='ml-2 text-xs text-gray-200'>{mate.email}</p>
              </div>
            </div>
            <button className='my-4 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'>
              <AiOutlineMessage size={24} />
            </button>
          </div>

          <div className='mx-auto flex h-[1140px] w-7/12 min-w-[600px] flex-col flex-wrap content-between justify-between'>
            <div className='h-[610px] w-[36%] min-w-[200px] rounded-3xl border bg-[#FFFFFF]'>
              <img
                className='h-[400px] w-full rounded-t-3xl object-cover'
                src={mate.profile_image !== null || undefined ? mate.profile_image! : '/src/assets/imgs/user.png'}
                alt='user'
              />
              <h1 className='px-5 pt-5 text-xl font-bold'>소개</h1>
              <p className='px-5 py-3'>{mate.description}</p>
            </div>

            <div className='h-[512px] w-[36%] min-w-[200px] rounded-3xl border bg-gradient-to-b from-softYellow from-0% via-[#FFFFFF] via-20% to-[#FFFFFF] to-90% px-5'>
              <h1 className='pt-5 text-2xl font-bold'>후원자 랭킹</h1>
              <p className='py-2 text-base font-medium underline decoration-primary decoration-4'>의뢰</p>
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
            </div>

            <div className='flex h-[193px] w-[62%] min-w-[350px] rounded-3xl border bg-[#FFFFFF] p-8'>
              <div
                className='h-[130px] w-[130px] overflow-hidden rounded-3xl bg-gray-100'
                style={{
                  backgroundImage: `url(${lol})`, // 배경 이미지 설정
                  backgroundSize: '130px 130px', // 이미지 크기를 322px x 331px으로 설정
                  backgroundRepeat: 'no-repeat', // 배경 이미지가 반복되지 않도록 설정
                  backgroundPosition: '0px',
                }}
              ></div>
              <div className='h-[82px] w-3/5 px-4 py-1'>
                <h1 className='pb-1 text-2xl font-bold'>리그오브레전드</h1>
                <p className='flex items-center pb-1'>
                  <img src='/src/assets/imgs/star.svg' alt='리뷰 별점 아이콘' className='h-[18px] w-[18px]' />
                  &nbsp;5.00&nbsp;
                  <span className='text-sm text-gray-300'>| 받은 의뢰수 10</span>
                </p>
                <VitaPrice mate={mate} />
              </div>
              <button className='my-8 h-[50px] w-[120px] rounded-xl bg-gradient-to-r from-primary to-limeGreen text-[24px] font-bold'>
                의뢰
              </button>
            </div>

            <div className='flex h-[560px] w-[62%] min-w-[350px] flex-col justify-between rounded-3xl border bg-[#FFFFFF] p-5'>
              <div className='mb-1 flex items-center'>
                <p className='rounded bg-primary text-xl text-[#FFFFFF]'>
                  <MdNotes />
                </p>
                <h1 className='px-2 text-2xl font-bold'>게임 정보</h1>
              </div>

              <div className='h-[120px] w-full rounded-3xl bg-gray-100 p-4 text-sm'>게임메이트등록 소개글</div>
              <div className='h-[230px] w-full rounded-3xl bg-gray-100'>이미지 들어갈 자리(width 값 조정해도 됨)</div>
              <div className='flex h-[60px] w-full items-center rounded-3xl bg-gray-100 p-4 text-sm'>
                <div className='mr-2 h-6 w-6 rounded-full bg-slate-200 p-[4px] text-base text-[#FFFFFF]'>
                  <PiCrownSimpleFill />
                </div>
                <p className='text-[15px] text-gray-300'>
                  <span className='text-gray-500'>레벨:</span> 다이아몬드
                </p>
              </div>
            </div>

            <div className='h-[350px] w-[62%] min-w-[350px] rounded-3xl border bg-[#FFFFFF] p-5'>
              <div className='mb-2 flex items-center'>
                <img className='w-7' src='/src/assets/imgs/star.svg' alt='star' />
                <h1 className='px-2 text-2xl font-bold'>4.98 • 사용자 의견 (63)</h1>
              </div>
              <ReviewList />
              <ReviewList />
              <ReviewList />
              <div className='flex justify-center'>
                <button className='h-[35px] w-[110px] rounded-xl bg-softYellow hover:font-semibold'>자세히 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
