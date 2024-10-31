import EventSection from '@/components/Homepage/EventSection';
import CategorySection from '@/components/Homepage/CategorySection';
import GameMateSection from '@/components/Homepage/GameMateSection';
import GameCategorySection from '@/components/Homepage/GameCategorySection';
import RealTimeReviewsSection from '@/components/Homepage/RealTimeReviewsSection';

export default function HomePage() {
  return (
    <>
      <div className='relative'>
        <EventSection /> {/* 이벤트 섹션 */}
        <CategorySection /> {/* 추천 카테고리 섹션 */}
        <GameMateSection /> {/* 오늘의 게임 메이트 */}
        <GameCategorySection /> {/* 카테고리별 추천메이트 */}
        <RealTimeReviewsSection /> {/* 실시간 생생후기 */}
      </div>
    </>
  );
}
