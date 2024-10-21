import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FilterList from '../components/Common/FilterList';
import TitleIntro from '../components/Common/TitleIntro';
import ProfileImg from '../components/Common/ProfileImg';
import CommonLayout from '../layouts/CommonLayout';
import { useUserStore } from '@/config/store';
import { profilePatch } from '@/api/profilePatch';
import Nickname from '@/components/EditInfoPage/Nickname';
import Description from '@/components/EditInfoPage/Description';
import GenderCheck from '@/components/EditInfoPage/GenderCheck';
import Birthday from '@/components/EditInfoPage/Birthday';

export default function EditInfoPage() {
  const { user, setUser } = useUserStore();
  const [isPatch, setIsPatch] = useState(false);

  const birthDate = user.birthday !== null ? new Date(user.birthday!) : null;
  const yearStr = birthDate !== null ? birthDate.getFullYear().toString() : '';
  const monthStr = birthDate !== null ? (birthDate.getMonth() + 1).toString() : '';
  const dateStr = birthDate !== null ? birthDate.getDate().toString() : '';

  const years = Array.from({ length: 22 }, (_, i) => 1984 + i); // 2020 ~ 2030
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [birthYear, setBirthYear] = useState(yearStr);
  const [birthMonth, setBirthMonth] = useState(monthStr && Number(monthStr) < 10 ? `0${monthStr}` : monthStr);
  const [birthDay, setBirthDay] = useState(dateStr && Number(dateStr) < 10 ? `0${dateStr}` : dateStr);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1)); // 기본 일수는 31

  const [profile, setProfile] = useState({
    profile_image: user.profile_image,
    nickname: user.nickname!,
    description: user.description,
    gender: user.gender,
    birthday: `${birthYear}-${birthMonth}-${birthDay}`,
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

  const handleChangePickedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) {
      setProfile({ ...profile, profile_image: null });
    }

    const imageUrl = URL.createObjectURL(file);

    return setProfile({ ...profile, profile_image: imageUrl });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(profile);
    setIsPatch(true);
    console.log('profile', profile);
  };

  useEffect(() => {
    if (isPatch) {
      profilePatch(user);
    }
  }, [isPatch]);

  console.log('user', user);

  return (
    <CommonLayout>
      <div className='h-[4105px] w-full'>
        <TitleIntro titleE={'MY PROFILE'} titleK={'프로필 편집'} content={'멋진 실력을 자랑해주세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          <ProfileImg />
          <form onSubmit={handleSubmit} className='absolute left-[40.5%] top-[260px] h-[1028px] w-[50%]'>
            <button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className='absolute left-[69%] top-[-210px] h-[60px] w-[31%] rounded-xl bg-gradient-to-r from-primary to-limeGreen text-[24px] font-bold'
            >
              프로필 사진 올리기
            </button>
            <input ref={fileInputRef} onChange={handleChangePickedImage} type='file' className='hidden' />

            <Nickname profile={profile} setProfile={setProfile} />
            <Description profile={profile} setProfile={setProfile} />
            <GenderCheck profile={profile} setProfile={setProfile} />
            <Birthday
              profile={profile}
              setProfile={setProfile}
              birthYear={birthYear}
              setBirthYear={setBirthYear}
              birthMonth={birthMonth}
              setBirthMonth={setBirthMonth}
              birthDay={birthDay}
              setBirthDay={setBirthDay}
              years={years}
              months={months}
              days={days}
            />

            <button
              className='h-[66px] w-full rounded-xl bg-gradient-to-r from-primary to-limeGreen text-2xl font-bold text-gray-500'
              type='submit'
            >
              저장
            </button>
          </form>

          <div className='absolute flex h-[1866px] w-[30%] justify-end bg-[#E2E2E2]'>
            <FilterList />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
