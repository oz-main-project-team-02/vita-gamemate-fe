import { ChangeEvent, useRef, useState } from 'react';
import TitleIntro from '@/components/Common/TitleIntro';
import Nickname from '@/components/EditInfoPage/Nickname';
import Description from '@/components/EditInfoPage/Description';
import GenderCheck from '@/components/EditInfoPage/GenderCheck';
import Birthday from '@/components/EditInfoPage/Birthday';
import { updateMyProfile } from '@/api/user';
import { UserProfileUpdateData } from '@/config/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MypageLayout from '@/layouts/MypageLayout';
import { useUserStore } from '@/config/store';
import axios from 'axios';

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
    birthday: birthDate && `${birthYear}-${birthMonth}-${birthDay}`,
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

    if (profile.nickname.length < 2) {
      toast.error('최소 2자 이상입니다!', {
        autoClose: 2000,
      });
      return null;
    }

    if (profile.birthday !== birthDate && `${birthYear}-${birthMonth}-${birthDay}`) {
      setBirthYear('');
      setBirthMonth('');
      setBirthDay('');
      setProfile({ ...profile, birthday: null });

      toast.error('정확한 생일 폼을 입력해주세요', {
        autoClose: 2000,
      });
    }

    const data = new FormData();

    if (fileRef.current?.files?.[0]) {
      data.append('profile_image', fileRef.current.files[0]);
    }
    data.append('nickname', profile.nickname);
    data.append('description', profile.description || '');
    data.append('gender', profile.gender || '');
    data.append('birthday', profile.birthday || '');

    try {
      await updateMyProfile(data);

      setUser(profile);
      setPreviewImage(null);

      toast.success('저장 되었습니다!', {
        autoClose: 2000,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.error);
      }
    }
  };

  console.log('profile', profile);

  return (
    <>
      <ToastContainer />
      <TitleIntro titleE={'MY PROFILE'} titleK={'프로필 편집'} content={'멋진 실력을 자랑해주세요!'} />
      <MypageLayout>
        <div className='m-auto mt-[140px] min-h-[calc(100dvh-597px)] max-w-[800px]'>
          <div className='w-full bg-gray-100'>
            {previewImage && (
              <div className='w-[300px] bg-gray-100'>
                <img className='scale-90 rounded-full' src={previewImage} alt='이미지 미리보기' />
              </div>
            )}
            <form onSubmit={handleSubmit} className='relative flex w-full flex-col items-end'>
              <label
                htmlFor='fileInput'
                className='inline-block transform cursor-pointer rounded-xl bg-[#eeeeee] px-3 py-2 font-semibold hover:scale-95 lg:text-base'
              >
                프로필 사진 올리기
                <input id='fileInput' ref={fileRef} onChange={handleChangePickedImage} type='file' className='hidden' />
              </label>

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
                className='h-[66px] w-full rounded-xl bg-primary text-2xl font-bold text-gray-500 hover:scale-95'
                type='submit'
              >
                저장
              </button>
            </form>
          </div>
        </div>
      </MypageLayout>
    </>
  );
}
