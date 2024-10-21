import { Game } from '@/config/const';
import { useNavigate } from 'react-router-dom';

type Props = {
  game: string;
  gameData: Game;
};

export default function GameCard({ game, gameData }: Props) {
  const navigate = useNavigate();

  let bgColor: string = '';
  let bgSize: string = '';
  let bgPosition: string = '';

  switch (game) {
    case 'lol':
      bgColor = 'bg-[#B8B13B]';
      bgSize = '115px 102px';
      bgPosition = '135px 9px';
      break;

    case 'tft':
      bgColor = 'bg-[#85B9CC]';
      bgSize = '76px 103px';
      bgPosition = '150px 4px';
      break;

    case 'bg':
      bgColor = 'bg-[#424244]';
      bgSize = '87px 111px';
      bgPosition = '140px 0px';
      break;

    case 'overwatch':
      bgColor = 'bg-[#7D7BAE]';
      bgSize = '162px 101px';
      bgPosition = '80px 10px';
      break;
  }

  const handleCategoryClick = (id: number) => {
    if (id === undefined) return navigate('*');
    navigate(`/category/${id}`);
  };

  return (
    <div
      onClick={() => handleCategoryClick(gameData.id)}
      style={{
        backgroundImage: `url(${gameData.gameCardImg})`,
        backgroundSize: `${bgSize}`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${bgPosition}`,
      }}
      className={`m-2 h-[112px] w-[23.4%] min-w-[100px] cursor-pointer rounded-2xl hover:opacity-90 ${bgColor} p-4 text-[#FFFFFF]`}
    >
      <h1 className='text-lg font-bold'>{gameData.title}</h1>
      <p className='text-sm font-normal'>{gameData.type}</p>
    </div>
  );
}
