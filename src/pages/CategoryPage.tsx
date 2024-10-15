import { useState } from "react";
import TitleIntro from "../components/Common/TitleIntro";
import CommonLayout from "../layouts/CommonLayout";
import MateCard from "../components/Common/MateCard";

export default function CategoryPage() {
  const [sort, setSort] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const sortArr = [
    "추천순",
    "신규 가입",
    "최고 평가",
    "최저 가격",
    "최고 가격",
  ];
  const genderArr = ["모두", "여성", "남성"];
  return (
    <CommonLayout>
      <TitleIntro
        titleE='LEAGUE OF LEGENDS'
        titleK='리그오브레전드'
        content='다양한 챔피언과 함께 친구들과 즐거운 순간을 만들어보세요!'
      />
      <div className='flex'>
        <div className='flex flex-col px-[20px] py-[30px] w-[240px] gap-6 bg-[#e2e2e2] '>
          <div>
            <div className='text-[#8A8C99]'>정렬</div>
            {sortArr.map((v, i) => (
              <div key={i}>
                <input
                  type='radio'
                  id={`sort${i + 1}`}
                  value={v}
                  checked={sort === v}
                  onChange={() => setSort(v)}
                  hidden
                />
                <label
                  htmlFor={`sort${i + 1}`}
                  className='flex gap-2 mt-3 items-center'
                >
                  <img
                    src={
                      sort === v
                        ? "/src/assets/imgs/radioTrue.svg"
                        : "/src/assets/imgs/radioFalse.svg"
                    }
                    alt='라디오 버튼 아이콘'
                  />
                  <span className='text-sm text-[#525566]'>{v}</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <div className='text-[#8A8C99]'>성별</div>
            {genderArr.map((v, i) => (
              <div key={i}>
                <input
                  type='radio'
                  id={`gender${i + 1}`}
                  value={v}
                  checked={gender === v}
                  onChange={() => setGender(v)}
                  hidden
                />
                <label
                  htmlFor={`gender${i + 1}`}
                  className='flex gap-2 mt-3 items-center'
                >
                  <img
                    src={
                      gender === v
                        ? "/src/assets/imgs/radioTrue.svg"
                        : "/src/assets/imgs/radioFalse.svg"
                    }
                    alt='라디오 버튼 아이콘'
                  />
                  <span className='text-sm text-[#525566]'>{v}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className='flex flex-col justify-center bg-gray-100 py-11'
          style={{ width: `calc(100% - 200px)` }}
        >
          <div className='flex flex-wrap max-w-[1120px] gap-[10px] p-[20px]'>
            {Array(30)
              .fill(0)
              .map((_, i) => (
                <div className='mb-4'>
                  <MateCard key={i} />
                </div>
              ))}
          </div>
          <div className='flex justify-center'>
            <button className='px-4 py-3 bg-gray-400 rounded-lg text-white shadow-sm'>
              more
            </button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
