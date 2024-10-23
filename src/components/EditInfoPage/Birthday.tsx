import { UserProfileUpdateData } from '@/config/types';
import { useEffect, useState } from 'react';

type ProfileProps = {
  profile: UserProfileUpdateData;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileUpdateData>>;
  birthYear: string;
  setBirthYear: React.Dispatch<React.SetStateAction<string>>;
  birthMonth: string;
  setBirthMonth: React.Dispatch<React.SetStateAction<string>>;
  birthDay: string;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
};

export default function Birthday({
  profile,
  setProfile,
  birthYear,
  setBirthYear,
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
}: ProfileProps) {
  const years = Array.from({ length: 22 }, (_, i) => 1984 + i); // 2020 ~ 2030
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1)); // 기본 일수는 31

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

  return (
    <div className='mb-[61px] h-[93px] w-1/2'>
      <p className='mb-[10px] text-2xl font-bold text-gray-500'>생일</p>
      <select
        value={birthYear}
        onChange={(e) => {
          setBirthYear(e.target.value);
          setProfile({
            ...profile,
            birthday: `${e.target.value}-${birthMonth}-${birthDay}`,
          });
        }}
        className='form-control mx-3 h-[35px] w-[133px] rounded-md border border-gray-200 focus:outline-none'
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
        onChange={(e) => {
          setBirthMonth(e.target.value);
          setProfile({
            ...profile,
            birthday: `${birthYear}-${e.target.value}-${birthDay}`,
          });
        }}
        className='form-control mx-3 h-[35px] w-[133px] rounded-md border border-gray-200 focus:outline-none'
      >
        <option value=''>월</option>
        {months.map((month) => (
          <option key={month} value={month < 10 ? `0${month}` : month}>
            {month < 10 ? `0${month}` : month}
          </option>
        ))}
      </select>

      <select
        value={birthDay}
        onChange={(e) => {
          setBirthDay(e.target.value);
          setProfile({
            ...profile,
            birthday: `${birthYear}-${birthMonth}-${e.target.value}`,
          });
        }}
        className='form-control mx-3 h-[35px] w-[133px] rounded-md border border-gray-200 focus:outline-none'
      >
        <option value=''>일</option>
        {days.map((day) => (
          <option key={day} value={day < 10 ? `0${day}` : day}>
            {day < 10 ? `0${day}` : day}
          </option>
        ))}
      </select>
    </div>
  );
}
