import { AiOutlineMessage } from 'react-icons/ai';
import { MdNotes } from 'react-icons/md';
import { PiCrownSimpleFill } from 'react-icons/pi';
import Gender from '../components/Common/Gender';
import OnlineFlag from '../components/Common/OnlineFlag';
import TitleIntro from '../components/Common/TitleIntro';
import CommonLayout from '../layouts/CommonLayout';
import UserRanking from '../components/UserDetailPage/UserRanking';
import VitaPrice from '../components/Common/VitaPrice';
import lol from '../assets/imgs/lol.png';
import ReviewList from '../components/UserDetailPage/ReviewList';
import { MateUser, User } from '../config/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { client } from '@/api/client';

export default function UserDetailPage() {
  const { userId } = useParams();

  const { data: mate } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        const response = await client.get(`/api/v1/users/${userId}/profile/`);

        if (response.data.is_mate) {
          const { data }: { data: MateUser } = await client.get(`/api/v1/mates/${userId}/`);
          return data;
        }
        return response.data;
      } catch (err) {
        console.error(err);
      }
    },
  });
  console.log(mate);

  return (
    <CommonLayout>
      <div className='h-[4105px] w-full'>
        <TitleIntro titleE={'Vita User'} titleK={'사용자 정보'} content={'비타 유저를 구경하세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100 pt-[93px]'>
          <div className='mx-auto mb-[48px] flex h-[127px] w-7/12 rounded-3xl border bg-[#FFFFFF] px-[37px] py-[27px]'>
            <div className='h-[74px] w-[74px] rounded-full border bg-slate-50'>
              <img className='h-[70px] w-[70px] p-2' src='/src/assets/imgs/user.png' alt='user' />
            </div>
            <div className='mx-6 flex h-[75px] w-[900px] flex-col'>
              <p className='mb-[1px]'>닉네임</p>
              <Gender gender='male' age={26} />
              <div className='relative ml-[45px] mt-[-30px] w-[100px]'>
                <OnlineFlag />
              </div>
              <div className='mt-9 flex items-center'>
                <div className='h-[19px] w-[31px] rounded-xl bg-gray-200 px-[10px] text-sm text-[#FFFFFF]'>id</div>
                <p className='ml-2 text-xs text-gray-200'>아이디</p>
              </div>
            </div>
            <button className='my-4 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-200'>
              <AiOutlineMessage size={24} />
            </button>
          </div>

          <div className='mx-auto flex h-[1170px] w-7/12 flex-col flex-wrap content-between justify-between'>
            <div className='h-[610px] w-1/3 rounded-3xl border bg-[#FFFFFF]'>
              <img className='h-[400px] w-[400px]' src='/src/assets/imgs/user.png' alt='user' />
              <h1 className='px-5 pt-5 text-xl font-bold'>소개</h1>
              <p className='px-5 py-3'>소개말</p>
            </div>

            <div className='h-[512px] w-1/3 rounded-3xl border bg-gradient-to-b from-softYellow from-0% via-[#FFFFFF] via-20% to-[#FFFFFF] to-90% px-5'>
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

            <div className='flex h-[193px] w-3/5 rounded-3xl border bg-[#FFFFFF] p-8'>
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

            <div className='flex h-[560px] w-3/5 flex-col justify-between rounded-3xl border bg-[#FFFFFF] p-5'>
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

            <div className='h-[350px] w-3/5 rounded-3xl border bg-[#FFFFFF] p-5'>
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
