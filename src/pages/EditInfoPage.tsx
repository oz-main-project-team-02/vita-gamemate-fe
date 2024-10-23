import { ChangeEvent, useRef, useState } from 'react';
import FilterList from '../components/Common/FilterList';
import TitleIntro from '../components/Common/TitleIntro';
import ProfileImg from '../components/Common/ProfileImg';
import CommonLayout from '../layouts/CommonLayout';
import { useUserStore } from '@/config/store';
import Nickname from '@/components/EditInfoPage/Nickname';
import Description from '@/components/EditInfoPage/Description';
import GenderCheck from '@/components/EditInfoPage/GenderCheck';
import Birthday from '@/components/EditInfoPage/Birthday';
import { updateMyProfile } from '@/api/user';
import { UserProfileUpdateData } from '@/config/types';

export default function EditInfoPage() {
  const { user, setUser } = useUserStore();

  const birthDate = user.birthday !== null ? new Date(user.birthday!) : null;

  const yearStr = birthDate !== null ? birthDate.getFullYear().toString() : '';
  const monthStr = birthDate !== null ? (birthDate.getMonth() + 1).toString() : '';
  const dateStr = birthDate !== null ? birthDate.getDate().toString() : '';

  const [birthYear, setBirthYear] = useState(yearStr);
  const [birthMonth, setBirthMonth] = useState(monthStr && Number(monthStr) < 10 ? `0${monthStr}` : monthStr);
  const [birthDay, setBirthDay] = useState(dateStr && Number(dateStr) < 10 ? `0${dateStr}` : dateStr);

  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfileUpdateData>({
    profile_image: user.profile_image,
    nickname: user.nickname!,
    description: user.description,
    gender: user.gender,
    birthday: birthDate === null ? null : `${birthYear}-${birthMonth}-${birthDay}`,
  });

  const handleChangePickedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) {
      setProfile({ ...profile, profile_image: null });
      setPreviewImage(null);
    }

    const imageUrl = URL.createObjectURL(file);

    setProfile({ ...profile, profile_image: imageUrl });
    setPreviewImage(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    if (fileRef.current?.files?.[0]) {
      data.append('profile_image', fileRef.current.files[0]);
    }
    data.append('nickname', profile.nickname);
    data.append('description', profile.description || '');
    data.append('gender', profile.gender || '');
    data.append('birthday', profile.birthday || '');

    await updateMyProfile(data);

    setUser(profile);
  };

  return (
    <CommonLayout>
      <div className='h-[4105px] w-full'>
        <TitleIntro titleE={'MY PROFILE'} titleK={'프로필 편집'} content={'멋진 실력을 자랑해주세요!'} />
        <div className='relative h-[1866px] w-full bg-gray-100'>
          {previewImage ? (
            <div className='absolute left-[35%] top-[-120px] z-40 h-[300px] w-[30%]'>
              <img
                className='w-min-[100px] h-[300px] w-[52.6%] rounded-full object-cover'
                src={previewImage}
                alt='이미지 미리보기'
              />
            </div>
          ) : null}
          <ProfileImg />
          <form onSubmit={handleSubmit} className='absolute left-[40.5%] top-[260px] h-[1028px] w-[50%]'>
            <button
              onClick={() => {
                fileRef.current?.click();
              }}
              className='absolute left-[69%] top-[-210px] h-[60px] w-[31%] rounded-xl bg-gradient-to-r from-primary to-limeGreen text-[24px] font-bold hover:text-[25px]'
            >
              프로필 사진 올리기
            </button>
            <input ref={fileRef} onChange={handleChangePickedImage} type='file' className='hidden' />

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
            />

            <button
              className='h-[66px] w-full rounded-xl bg-gradient-to-r from-primary to-limeGreen text-2xl font-bold text-gray-500 hover:text-[26px]'
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
