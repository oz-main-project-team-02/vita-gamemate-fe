import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FilterList from '../components/EditInfoPage/FilterList';
import TitleIntro from '../components/Common/TitleIntro';
import ProfileImg from '../components/EditInfoPage/ProfileImg';
import CommonLayout from '../layouts/CommonLayout';
import { useUserStore } from '@/config/store';
import Male from '@/components/EditInfoPage/Male';
import Female from '@/components/EditInfoPage/Female';

export default function EditInfoPage() {
  const { user } = useUserStore();

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
    profileImage: user.profile_image,
    nickname: user.nickname!,
    description: user.description,
    gender: user.gender,
    date: `${birthYear}-${birthMonth}-${birthDay}`,
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
      setProfile({ ...profile, profileImage: null });
    }

    const imageUrl = URL.createObjectURL(file);

    return setProfile({ ...profile, profileImage: imageUrl });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('profile', profile);
  };

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

            <div className='mb-[61px] h-[144px] w-full'>
              <p className='mb-[10px] text-2xl font-bold text-gray-500'>닉네임</p>
              <input
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                className='h-[66px] w-full rounded-xl bg-primary px-6 focus:outline-none'
              />
              <p className={profile.nickname === '' ? 'hidden' : 'mt-[13px] text-base text-error'}>
                매주 한 번만 변경 가능하니 신중하게 설정하세요
              </p>
            </div>

            <div className='mb-[61px] h-[214px] w-full'>
              <p className='mb-[10px] text-2xl font-bold text-gray-500'>소개</p>
              <input
                value={profile.description !== null ? profile.description : ''}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                className='h-[168px] w-full rounded-xl bg-primary pb-28 pt-1 indent-6 text-gray-500 focus:outline-none'
                placeholder='본인을 어필할 수 있어요!'
              />
            </div>

            <div className='mb-[61px] h-[148px] w-full'>
              <p className='mb-[10px] text-2xl font-bold text-gray-500'>성별</p>
              {profile.gender === null ? (
                <>
                  <Male profile={profile} setProfile={setProfile} />
                  <Female profile={profile} setProfile={setProfile} />
                </>
              ) : profile.gender === 'male' ? (
                <Male profile={profile} setProfile={setProfile} />
              ) : (
                <Female profile={profile} setProfile={setProfile} />
              )}
              <p className='mt-[13px] text-base text-error'>성별은 수정이 불가합니다.</p>
            </div>

            <div className='mb-[61px] h-[93px] w-1/2'>
              <p className='mb-[10px] text-2xl font-bold text-gray-500'>생일</p>
              <select
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(e.target.value);
                  setProfile({
                    ...profile,
                    date: `${e.target.value}-${birthMonth}-${birthDay}`,
                  });
                }}
                className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
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
                    date: `${birthYear}-${e.target.value}-${birthDay}`,
                  });
                }}
                className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
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
                    date: `${birthYear}-${birthMonth}-${e.target.value}`,
                  });
                }}
                className='form-control mx-3 w-[133px] rounded-md border border-gray-200'
              >
                <option value=''>일</option>
                {days.map((day) => (
                  <option key={day} value={day < 10 ? `0${day}` : day}>
                    {day < 10 ? `0${day}` : day}
                  </option>
                ))}
              </select>
            </div>

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
