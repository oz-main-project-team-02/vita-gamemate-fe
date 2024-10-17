import bg from "../assets/imgs/cate-bg.png";
import tft from "../assets/imgs/cate-tft.png";
import lol from "../assets/imgs/cate-lol.png";
import overwatch from "../assets/imgs/cate-overwatch.png";

type Games = {
  id: number;
  img: string;
  title: string;
  subTitle: string;
  type: string;
  description: string;
};

type GameCategories = "1" | "2" | "3" | "4";

export const GAMES: Record<GameCategories, Games> = {
  "1": {
    id: 1,
    img: lol,
    title: "리그 오브 레전드",
    subTitle: "LEAGUE OF LEGENDS",
    type: "PC • AOS",
    description: "다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!",
  },
  "2": {
    id: 2,
    img: tft,
    title: "전략적 팀 전투",
    subTitle: "TEAMFIGHT TACTICS",
    type: "PC • TFT",
    description: "다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!",
  },
  "3": {
    id: 3,
    img: bg,
    title: "배틀그라운드",
    subTitle: "BATTLEGROUNDS",
    type: "PC • FPS",
    description: "다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!",
  },
  "4": {
    id: 4,
    img: overwatch,
    title: "오버워치",
    subTitle: "OVERWATCH",
    type: "PC • FPS",
    description: "다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!",
  },
};

export const getGame = (gameId: number) => {
  return GAMES[gameId.toString() as GameCategories];
};
