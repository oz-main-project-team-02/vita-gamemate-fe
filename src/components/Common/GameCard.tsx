import { Game } from '@/config/const';
import { useNavigate } from 'react-router-dom';

type Props = {
  game: string;
  gameData: Game;
};

export default function GameCard({ game, gameData }: Props) {
  const navigate = useNavigate();

  let bgColor: string = '';

  switch (game) {
    case 'lol':
      bgColor = 'bg-[#B8B13B]';
      break;

    case 'tft':
      bgColor = 'bg-[#85B9CC]';
      break;

    case 'bg':
      bgColor = 'bg-[#424244]';
      break;

    case 'overwatch':
      bgColor = 'bg-[#7D7BAE]';
      break;
  }

  const handleCategoryClick = (id: number) => {
    if (id === undefined) return navigate('*');
    navigate(`/category/${id}`);
  };

  return (
    <div
      onClick={() => handleCategoryClick(gameData.id)}
      className={`relative m-2 h-[80px] w-[200px] cursor-pointer rounded-2xl hover:scale-95 lg:h-[100px] lg:w-[200px] xl:h-[112px] xl:w-[240px] ${bgColor} p-4 text-[#FFFFFF]`}
    >
      <h1 className='z-10 text-lg font-bold'>{gameData.title}</h1>
      <p className='text-sm font-normal'>{gameData.type}</p>
      <img
        src={gameData.gameCardImg}
        alt=''
        className='cover absolute bottom-0 right-0 h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] xl:h-[112px] xl:w-[112px]'
      />
    </div>
  );
}
