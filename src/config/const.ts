import bg from '@/assets/imgs/cate-bg.png';
import tft from '@/assets/imgs/cate-tft.png';
import lol from '@/assets/imgs/cate-lol.png';
import overwatch from '@/assets/imgs/cate-overwatch.png';
import bgIcon from '@/assets/imgs/icon-bg.png';
import tftIcon from '@/assets/imgs/icon-tft.png';
import lolIcon from '@/assets/imgs/icon-lol.png';
import overwatchIcon from '@/assets/imgs/icon-overwatch.png';
import gameCardLOL from '@/assets/imgs/lol.png';
import gameCardTFT from '@/assets/imgs/tft.png';
import gameCardOVERWATCH from '@/assets/imgs/overwatch.png';
import gameCardBG from '@/assets/imgs/bg.png';

export type Games = {
  id: number;
  img: string;
  icon: string;
  title: string;
  subTitle: string;
  type: string;
  description: string;
  level: string[];
  gameCardImg: string;
};

type GameCategories = 'lol' | 'tft' | 'bg' | 'overwatch';

export const GAMES: Record<GameCategories, Games> = {
  lol: {
    id: 1,
    img: lol,
    icon: lolIcon,
    title: '리그오브레전드',
    subTitle: 'LEAGUE OF LEGENDS',
    type: 'PC • AOS',
    description: '다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!',
    level: [
      '챌린저',
      '그랜드 마스터',
      '마스터',
      '다이아몬드',
      '에메랄드',
      '플래티넘',
      '골드',
      '실버',
      '브론즈',
      '아이언',
    ],
    gameCardImg: gameCardLOL,
  },
  tft: {
    id: 2,
    img: tft,
    icon: tftIcon,
    title: '전략적 팀 전투',
    subTitle: 'TEAMFIGHT TACTICS',
    type: 'PC • TFT',
    description: '다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!',
    level: [
      '챌린저',
      '그랜드 마스터',
      '마스터',
      '다이아몬드',
      '에메랄드',
      '플래티넘',
      '골드',
      '실버',
      '브론즈',
      '아이언',
    ],
    gameCardImg: gameCardTFT,
  },
  bg: {
    id: 3,
    img: bg,
    icon: bgIcon,
    title: '배틀그라운드',
    subTitle: 'BATTLEGROUNDS',
    type: 'PC • FPS',
    description: '다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!',
    level: ['마스터', '다이아몬드', '플래티넘', '골드', '실버', '브론즈'],
    gameCardImg: gameCardBG,
  },
  overwatch: {
    id: 4,
    img: overwatch,
    icon: overwatchIcon,
    title: '오버워치',
    subTitle: 'OVERWATCH',
    type: 'PC • FPS',
    description: '다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!',
    level: ['챔피언', '그랜드 마스터', '마스터', '다이아몬드', '에메랄드', '플래티넘', '골드', '실버', '브론즈'],
    gameCardImg: gameCardOVERWATCH,
  },
};

// 게임을 가져오는 함수
export const getGame = (gameKey: number | string) => {
  if (typeof gameKey === 'number') {
    // gameId를 기반으로 게임의 데이터들을 찾아야할 때,
    return Object.values(GAMES).find((game) => game.id === gameKey);
  }

  if (typeof gameKey === 'string') {
    // 게임의 이름을 기반으로 게임의 데이터들을 찾아야할 때, || value.title 을 통해 찾으면됩니다.
    return Object.entries(GAMES).find(([, value]) => value.title === gameKey)?.[1];
  }
};
