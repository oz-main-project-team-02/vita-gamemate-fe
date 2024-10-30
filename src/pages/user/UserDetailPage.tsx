import TitleIntro from '@/components/Common/TitleIntro';
import { MateGameInfo, User } from '@/config/types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import ErrorPage from '@/pages/ErrorPage';
import { useOrderModalStore } from '@/config/store';
import { OrderModal } from '@/components/Common/OrderModal';
import { useEffect, useState } from 'react';
import UserBar from '@/components/UserDetailPage/UserBar';
import GameOrderSection from '@/components/UserDetailPage/GameOrderSection';
import GameInfoSection from '@/components/UserDetailPage/GameInfoSection';
import ReviewSection from '@/components/UserDetailPage/ReviewSection';
import SelectGameSection from '@/components/UserDetailPage/SelectGameSection';

export default function UserDetailPage() {
  const { userId } = useParams();
  const { isOrderModalOpen } = useOrderModalStore();
  const [selectGame, setSelectGame] = useState<MateGameInfo[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: mate } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        const { data } = await client.get(`/api/v1/users/${userId}/profile/`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  console.log(mate);
  console.log(selectGame[0]);

  if (!mate) {
    return <ErrorPage />;
  }

  return (
    <>
      {isOrderModalOpen && <OrderModal mate={mate} />}
      <div className='w-full'>
        <TitleIntro titleE={'Vita User'} titleK={'사용자 정보'} content={'비타 유저를 구경하세요!'} />

        <div className='relative flex w-full flex-col items-center bg-gray-100 pt-[50px]'>
          <UserBar mate={mate} userId={userId} />

          <div className='mb-[300px] flex w-[1000px] justify-between'>
            <div className='h-[600px] w-[350px] rounded-3xl border bg-[#FFFFFF]'>
              <img
                className='h-[348px] w-full rounded-t-3xl object-cover'
                src={mate.profile_image ? mate.profile_image : '/src/assets/imgs/user.png'}
                alt='user'
              />
              <h1 className='px-5 pt-5 text-xl font-bold'>소개</h1>
              <p className='px-5 py-3'>{mate.description}</p>
            </div>

            {mate.is_mate && mate.mate_game_info?.length !== undefined ? (
              <>
                {/* 후원자 정보 */}
                {/* <UserRankingSection /> */}

                <div className='relative w-[620px]'>
                  {/* 게임 의뢰 정보 */}
                  <GameOrderSection mate={mate} selectGame={selectGame} />

                  {/* 게임 정보 */}
                  <GameInfoSection selectGame={selectGame} />

                  {/* 게임 선택 */}
                  <SelectGameSection mate={mate} setSelectGame={setSelectGame} />

                  {/* 리뷰 정보 */}
                  <ReviewSection userId={userId} selectGame={selectGame} />
                </div>
              </>
            ) : (
              <div className='h-[193px] w-[620px] rounded-3xl border bg-[#FFFFFF] p-8'>
                <div>이 사용자는 현재 lita 게임 메이트가 아닙니다</div>
                <div>수정 해야됨</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
