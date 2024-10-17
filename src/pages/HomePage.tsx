import CategorySlider from "../components/Homepage/CategorySlider";
import EventSlider from "../components/Homepage/EventSlider";
import GameCategorySlider from "../components/Homepage/GameCategorySlider";
import GameMateSlider from "../components/Homepage/GameMateSlider";
import { Review } from "../config/types";
import CommonLayout from "../layouts/CommonLayout";
import { dummyReviews } from "../mock/dummy";

export default function HomePage() {
  return (
    <CommonLayout>
      <div className='relative'>
        {/* 이벤트 섹션 */}
        <div className='h-[440px] px-[100px]'>
          <div className='absolute top-[150px] left-0 right-0'>
            <EventSlider />
          </div>
        </div>
        {/* 추천 카테고리 섹션 */}
        <div className='flex items-center justify-center gap-10 h-[760px] bg-gray-100 px-[100px]'>
          <div className='flex items-center gap-36'>
            <div>
              <p className='text-gray-300 text-base'>RECOMMEND CATEGORY</p>
              <h1 className='text-[48px]'>
                추천 <span className='font-semibold'>카테고리</span>
              </h1>
              <p className='text-lg'>끝없는 도전과 재미를 제공하는 다양한 게임들!</p>
              <p className='text-lg'>당신의 게임 메이트도 함께합니다.</p>
            </div>
            <CategorySlider />
          </div>
        </div>
        {/* 오늘의 게임 메이트 */}
        <div className='flex items-center justify-center h-[760px] px-[100px]'>
          <div className='flex items-center gap-36'>
            <div>
              <p className='text-gray-300 text-base'>TODAY GAMEMATE</p>
              <h1 className='text-[48px]'>
                오늘의 <span className='font-semibold'>게임 메이트</span>
              </h1>
              <p className='text-lg'>게임은 혼자보다 함께일 때 더 재미있어요!</p>
              <p className='text-lg'>당신의 게임 메이트를 찾아드립니다.</p>
            </div>
            <GameMateSlider />
          </div>
        </div>
        {/* 카테고리별 추천메이트 */}
        <div className='flex justify-center items-center gap-36 h-[760px] bg-gray-100 px-[100px]'>
          <div className='flex flex-col'>
            <div className='mb-8'>
              <select defaultValue='default' className='px-5 py-3 bg-gray-200 rounded-xl'>
                <option value='default' disabled>
                  게임을 선택해주세요!
                </option>
                <option value='game1'>게임 1</option>
                <option value='game2'>게임 2</option>
                <option value='game3'>게임 3</option>
                <option value='game4'>게임 4</option>
                <option value='game5'>게임 5</option>
              </select>
            </div>
            <div>
              <p className='text-gray-300 text-base'>LEAGUE OF LEGENDS</p>
              <h1 className='text-[48px]'>
                <span className='font-semibold'>리그오브레전드</span>
              </h1>
              <p className='text-lg'>함께 게임할 준비가 된 메이트를 찾아봤어요,</p>
              <p className='text-lg'>바로 이분들이에요!</p>
            </div>
          </div>
          <div>
            <GameCategorySlider />
          </div>
        </div>
        {/* 실시간 생생후기 */}
        <div className='flex items-center justify-center h-[760px] px-[100px] gap-36'>
          <div>
            <div>
              <p className='text-gray-300 text-base'>RECOMMEND CATEGORY</p>
              <h1 className='text-[48px]'>
                실시간 <span className='font-semibold'>생생후기</span>
              </h1>
              <p className='text-lg'>게임을 더 재미있게 만드는 방법?</p>
              <p className='text-lg'>믿을 수 있는 게임 메이트와 함께라면 가능합니다!</p>
            </div>
          </div>
          <div className='relative max-w-[720px] w-full'>
            <div className='flex flex-col gap-5'>
              {dummyReviews.map((review: Review, i) => (
                <div key={i} className='flex justify-between h-[100px] bg-gray-200 rounded-3xl px-4 py-3 shadow-lg'>
                  <div>
                    <h1 className='text-lg font-bold'>{review.request_id}</h1>
                    <p>{review.content}</p>
                  </div>
                  <p className='text-gray-400'>{review.created_at.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* 그라데이션 오버레이 적용 */}
            <div className='absolute bottom-[-20px] left-[-20px] right-[-20px] h-[100px] bg-gradient-to-t from-primary to-transparent'></div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
