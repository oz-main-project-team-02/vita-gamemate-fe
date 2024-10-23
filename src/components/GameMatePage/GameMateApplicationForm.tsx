import { getGame } from '@/config/const';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import GameSection from './GameSection';
import LevelSection from './LevelSection';
import DescriptionSection from './DescriptionSection';
import PriceSection from './PriceSection';
import ImageSection from './ImageSection';
import { MateRegister } from '@/config/types';
import { mateApi } from '@/api';

type Dropdown = {
  game: boolean;
  level: boolean;
};

export default function GameMateApplicationForm() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Dropdown>({
    game: false,
    level: false,
  });
  const [formData, setFormData] = useState<MateRegister>({
    game_id: null,
    level: null,
    description: null,
    image: null,
    request_price: null,
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(formData);

  // 게임메이트 등록하기 Mutation
  const mateRegisterMutation = useMutation({
    mutationFn: (mateInfo: FormData) => mateApi.registerGameMate(mateInfo),
  });

  // 게임메이트 등록하기 submit 함수
  const fetchMateRegister = async () => {
    const data = new FormData();

    if (formData.game_id) {
      const selectedGame = getGame(formData.game_id);
      if (selectedGame) {
        data.append('game_id', selectedGame?.id.toString());
      }
    }

    if (fileRef.current?.files?.[0]) {
      data.append('image', fileRef.current.files[0]);
    }

    data.append('level', formData.level || '');
    data.append('description', formData.description || '');
    data.append('request_price', formData.request_price?.toString() || '');

    mateRegisterMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('성공적으로 등록되었습니다', data);
      },
      onError: (error) => {
        console.error('등록 중 오류가 발생했습니다:', error);
      },
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-semibold'>재능 선택하기</h2>
      <GameSection
        setIsDropdownOpen={setIsDropdownOpen}
        game_id={formData.game_id}
        isDropdownOpen={isDropdownOpen}
        setFormData={setFormData}
      />
      {formData.game_id && (
        <form className='flex flex-col gap-6'>
          <LevelSection
            formData={formData}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            setFormData={setFormData}
          />
          <DescriptionSection setFormData={setFormData} />
          <PriceSection setFormData={setFormData} />
          <ImageSection
            fileRef={fileRef}
            setFormData={setFormData}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
          />
          {formData.description && formData.game_id && formData.image && formData.level && (
            <button
              type='button'
              onClick={fetchMateRegister}
              className='mt-4 h-[50px] rounded-xl bg-gradient-to-r from-[#FFD800] to-[#D5FFB7] font-semibold'
            >
              게임메이트 신청하기
            </button>
          )}
        </form>
      )}
    </div>
  );
}
