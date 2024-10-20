import bg from '@/assets/imgs/cate-bg.png';
import tft from '@/assets/imgs/cate-tft.png';
import lol from '@/assets/imgs/cate-lol.png';
import overwatch from '@/assets/imgs/cate-overwatch.png';
import bgIcon from '@/assets/imgs/icon-bg.png';
import tftIcon from '@/assets/imgs/icon-tft.png';
import lolIcon from '@/assets/imgs/icon-lol.png';
import overwatchIcon from '@/assets/imgs/icon-overwatch.png';

type Game = {
  id: number;
  img: string;
  icon: string;
  title: string;
  subTitle: string;
  type: string;
  description: string;
  level: string[];
};

type GameCategories = 'lol' | 'tft' | 'bg' | 'overwatch';

export const Games: Record<GameCategories, Game> = {
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
  },
};

// 게임을 가져오는 함수
export const getGame = (gameKey: number | string) => {
  if (typeof gameKey === 'number') {
    // gameId를 기반으로 게임의 데이터들을 찾아야할 때,
    return Object.values(Games).find((game) => game.id === gameKey);
  }

  if (typeof gameKey === 'string') {
    // 게임의 이름을 기반으로 게임의 데이터들을 찾아야할 때, || value.title 을 통해 찾으면됩니다.
    return Object.entries(Games).find(([, value]) => value.title === gameKey)?.[1];
  }
};

// ------------------------------------------------------------------------

export type CoinPackage = {
  coin: number;
  price: number;
  discountPrice: number;
  discountRate: number;
};

export const CoinPackages: CoinPackage[] = [
  {
    coin: 500,
    price: 6000,
    discountPrice: 4680,
    discountRate: 22,
  },
  {
    coin: 1000,
    price: 12000,
    discountPrice: 9360,
    discountRate: 22,
  },
  {
    coin: 2000,
    price: 24000,
    discountPrice: 18720,
    discountRate: 22,
  },
  {
    coin: 5000,
    price: 60000,
    discountPrice: 45600,
    discountRate: 24,
  },
  {
    coin: 10000,
    price: 120000,
    discountPrice: 91200,
    discountRate: 24,
  },
  {
    coin: 30000,
    price: 360000,
    discountPrice: 266400,
    discountRate: 26,
  },
  {
    coin: 50000,
    price: 600000,
    discountPrice: 444000,
    discountRate: 26,
  },
  {
    coin: 100000,
    price: 1200000,
    discountPrice: 864000,
    discountRate: 28,
  },
];
