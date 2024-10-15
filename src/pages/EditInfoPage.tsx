import { useEffect, useState } from "react";
import FilterList from "../components/EditInfoPage/FilterList";
import TitleIntro from "../components/Common/TitleIntro";
import ProfileImg from "../components/EditInfoPage/ProfileImg";
import CommonLayout from "../layouts/CommonLayout";

export default function EditInfoPage() {
  const years = Array.from({ length: 22 }, (_, i) => 1984 + i); // 2020 ~ 2030
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1)); // 기본 일수는 31

  const [profile, setProfile] = useState({
    nickname: "",
    description: "",
    gender: "",
    date: `${birthYear}.${birthMonth}.${birthDay}`,
  });

  // 윤년 확인 함수
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // 월에 따른 일 수 계산 함수
  const getDaysInMonth = (year: number, month: number) => {
    if (month === 2) {
      // 2월의 일수는 윤년 여부에 따라 다름
      return isLeapYear(year) ? 29 : 28;
    }
    // 4, 6, 9, 11월은 30일, 그 외는 31일
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  };

  // 년도와 월이 변경될 때 일 수를 동적으로 업데이트
  useEffect(() => {
    if (birthYear && birthMonth) {
      const daysInMonth = getDaysInMonth(Number(birthYear), Number(birthMonth));
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [birthYear, birthMonth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };
  return (
    <CommonLayout>
      <div className='w-full h-[4105px]'>
        <TitleIntro
          titleE={"MY PROFILE"}
          titleK={"프로필 편집"}
          content={"멋진 실력을 자랑해주세요!"}
        />
        <div className='w-full h-[1866px] relative bg-gray-100 flex'>
          <div className='w-[30%] h-[1866px] flex justify-end bg-[#E2E2E2]'>
            <ProfileImg />
            <FilterList />
          </div>
          <div className='w-[70%] h-[1028px] bg-slate-200 flex flex-col'>
            <form onSubmit={handleSubmit} className=''>
              <div>
                <p>닉네임</p>
                <input
                  value={profile.nickname}
                  onChange={(e) =>
                    setProfile({ ...profile, nickname: e.target.value })
                  }
                />
                <p
                  className={profile.nickname === "" ? "hidden" : "text-error"}
                >
                  매주 한 번만 변경 가능하니 신중하게 설정하세요
                </p>
              </div>

              <div>
                <p>소개</p>
                <input
                  value={profile.description}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  placeholder='본인을 어필할 수 있어요!'
                />
              </div>

              <div>
                <p>성별</p>
                <input
                  className='w-[365px] h-[60px] mr-1 rounded-xl bg-slate-300 font-bold text-[24px]'
                  type='button'
                  value='남성'
                />
                <input
                  className='w-[365px] h-[60px] rounded-xl bg-slate-300 font-bold text-[24px]'
                  type='button'
                  value='여성'
                />
                <p className='text-error'>성별은 수정이 불가합니다.</p>
              </div>

              <div>
                <p>생일</p>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className='form-control'
                >
                  <option value=''>년</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className='form-control'
                >
                  <option value=''>월</option>
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month < 10 ? `0${month}` : month}
                    >
                      {month < 10 ? `0${month}` : month}
                    </option>
                  ))}
                </select>

                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className='form-control'
                >
                  <option value=''>일</option>
                  {days.map((day) => (
                    <option key={day} value={day < 10 ? `0${day}` : day}>
                      {day < 10 ? `0${day}` : day}
                    </option>
                  ))}
                </select>
              </div>

              <button type='submit'>저장</button>
            </form>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
