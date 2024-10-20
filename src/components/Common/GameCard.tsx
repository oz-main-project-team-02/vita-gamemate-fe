import lol from '@/assets/imgs/lol.png';
import tft from '@/assets/imgs/tft.png';
import overwatch from '@/assets/imgs/overwatch.png';
import bg from '@/assets/imgs/bg.png';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '@/config/const';

type GameCategories = 'lol' | 'tft' | 'overwatch' | 'bg';
type GameProps = {
  game: GameCategories;
};

export default function GameCard({ game }: GameProps) {
  const navigate = useNavigate();

  let gameName: string = '';
  let gameGenre: string = '';
  let bgColor: string = '';
  let bgImg: string = '';
  let bgSize: string = '';
  let bgPosition: string = '';
  const gameId: number | undefined = Object.entries(GAMES).find(([key]) => game === key)?.[1].id;

  switch (game) {
    case 'lol':
      gameName = '리그 오브 레전드';
      gameGenre = 'PC • AOS';
      bgColor = 'bg-[#B8B13B]';
      bgImg = lol;
      bgSize = '115px 102px';
      bgPosition = '135px 9px';
      break;

    case 'tft':
      gameName = '전략적 팀 전투';
      gameGenre = 'PC • TFT';
      bgColor = 'bg-[#85B9CC]';
      bgImg = tft;
      bgSize = '76px 103px';
      bgPosition = '150px 4px';
      break;

    case 'overwatch':
      gameName = '오버워치';
      gameGenre = 'PC • FPS';
      bgColor = 'bg-[#7D7BAE]';
      bgImg = overwatch;
      bgSize = '162px 101px';
      bgPosition = '80px 10px';
      break;

    case 'bg':
      gameName = '배틀그라운드';
      gameGenre = 'PC • FPS';
      bgColor = 'bg-[#424244]';
      bgImg = bg;
      bgSize = '87px 111px';
      bgPosition = '140px 0px';
      break;
  }

  const handleCategoryClick = (id: number | undefined) => {
    if (id === undefined) return navigate('*');
    navigate(`/category/${id}`);
  };

  return (
    <div
      onClick={() => handleCategoryClick(gameId)}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: `${bgSize}`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${bgPosition}`,
      }}
      className={`m-2 h-[112px] w-[250px] cursor-pointer rounded-2xl hover:opacity-90 ${bgColor} p-4 text-[#FFFFFF]`}
    >
      <h1 className='text-lg font-bold'>{gameName}</h1>
      <p className='text-sm font-normal'>{gameGenre}</p>
    </div>
  );
}
