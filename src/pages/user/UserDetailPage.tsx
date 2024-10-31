import TitleIntro from '@/components/Common/TitleIntro';
import { MateGameInfo, User } from '@/config/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import ErrorPage from '@/pages/ErrorPage';
import { useOrderModalStore } from '@/config/store';
import { OrderModal } from '@/components/Common/OrderModal';
import { useEffect, useState } from 'react';
import userImage from '@/assets/imgs/user.png';
import UserBar from '@/components/UserDetailPage/UserBar';
import GameOrderSection from '@/components/UserDetailPage/GameOrderSection';
import GameInfoSection from '@/components/UserDetailPage/GameInfoSection';
import ReviewSection from '@/components/UserDetailPage/ReviewSection';
import SelectGameSection from '@/components/UserDetailPage/SelectGameSection';

export default function UserDetailPage() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const { isOrderModalOpen } = useOrderModalStore();
  const [selectGame, setSelectGame] = useState<MateGameInfo>();
  const [isReview, setIsReview] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: mate } = useQuery<User>({
    queryKey: ['user', Number(userId)],
    queryFn: async () => {
      try {
        const { data } = await client.get(`/api/v1/users/${userId}/profile/`);
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if ((mate! || mate!.mate_game_info) !== undefined) {
      mate!.mate_game_info!.filter(
        (games: MateGameInfo) => games.game_id === Number(searchParams.get('game')) && setSelectGame(games)
      );
    }
  }, [mate]);

  console.log(mate);
  console.log(selectGame);

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
            <div
              className={`h-[560px] w-[350px] rounded-3xl border bg-[#FFFFFF] ${mate.is_mate && mate.mate_game_info?.length !== undefined ? 'mt-[220px]' : ''}`}
            >
              <img
                className='h-[400px] w-full rounded-t-3xl object-cover'
                src={mate.profile_image ? mate.profile_image : userImage}
                alt='user'
              />
              <h1 className='px-5 pt-5 text-xl font-bold'>소개</h1>
              <p className='px-5 py-3'>{mate.description}</p>
            </div>

            {mate.is_mate && mate.mate_game_info?.length !== undefined ? (
              <>
                <div className='relative w-[620px]'>
                  {/* 게임 의뢰 정보 */}
                  <GameOrderSection mate={mate} selectGame={selectGame} />

                  {/* 게임 정보 */}
                  <GameInfoSection selectGame={selectGame!} />

                  {/* 게임 선택 */}
                  <SelectGameSection mate={mate} setSelectGame={setSelectGame} setIsReview={setIsReview} />

                  {/* 리뷰 정보 */}
                  <ReviewSection
                    userId={userId}
                    selectGame={selectGame}
                    isReview={isReview}
                    setIsReview={setIsReview}
                  />
                </div>
              </>
            ) : (
              <div className='flex h-[193px] w-[620px] flex-col items-center justify-around rounded-3xl border bg-[#FFFFFF] p-8'>
                <div className='text-xl font-bold'>이 사용자는 현재 lita 게임 메이트가 아닙니다</div>
                <button
                  onClick={() => navigate(-1)}
                  className='h-[40px] w-[100px] rounded-xl border-2 hover:bg-gray-200'
                >
                  이전 페이지
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
