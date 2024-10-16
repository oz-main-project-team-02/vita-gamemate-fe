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
};

export const GAMES: Games[] = [
  { id: 1, img: lol, title: "리그 오브 레전드", subTitle: "LEAGUE OF LEGENDS", type: "PC • AOS" },
  { id: 2, img: tft, title: "전략적 팀 전투", subTitle: "TEAMFIGHT TACTICS", type: "PC • TFT" },
  { id: 3, img: bg, title: "배틀그라운드", subTitle: "BATTLEGROUNDS", type: "PC • FPS" },
  { id: 4, img: overwatch, title: "오버워치", subTitle: "OVERWATCH", type: "PC • FPS" },
];
