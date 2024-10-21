import CommonLayout from '../layouts/CommonLayout';
import TitleIntro from '../components/Common/TitleIntro';
import { useParams } from 'react-router-dom';
import { getGame } from '../config/const';
import FilterSidebar from '@/components/CategoryPage/FilterSidebar';
import GameCategoryCardList from '@/components/CategoryPage/GameCategoryCardList';
import { useState } from 'react';

export default function CategoryPage() {
  const { gameId } = useParams();
  const [sortValue, setSortValue] = useState<string>('recommendation');
  const [genderValue, setGenderValue] = useState<string>('all');
  const [levelValue, setLevelValue] = useState<string[]>([]);

  return (
    <CommonLayout>
      <TitleIntro
        titleE={getGame(Number(gameId))?.subTitle}
        titleK={getGame(Number(gameId))?.title}
        content={getGame(Number(gameId))?.description}
      />
      <div className='flex'>
        <FilterSidebar
          gameId={gameId!}
          sortValue={sortValue}
          setSortValue={setSortValue}
          genderValue={genderValue}
          setGenderValue={setGenderValue}
          levelValue={levelValue}
          setLevelValue={setLevelValue}
        />
        <GameCategoryCardList gameId={gameId} />
        {/* FIXME: API 개발 완료 시 교체만 하면됩니다. */}
        {/* <GameCategoryCardList gameId={gameId} sortValue={sortValue} genderValue={genderValue} levelValue={levelValue} /> */}
      </div>
    </CommonLayout>
  );
}
