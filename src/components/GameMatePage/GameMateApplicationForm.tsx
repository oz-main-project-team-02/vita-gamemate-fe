import { getGame } from '@/config/const';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import GameSection from './GameSection';
import LevelSection from './LevelSection';
import DescriptionSection from './DescriptionSection';
import PriceSection from './PriceSection';
import ImageSection from './ImageSection';
import { MateRegister, UserResponse } from '@/config/types';
import { useUserStore } from '@/config/store';
import Spinner from '../Common/Spinner';
import { mateApi } from '@/api';
import { toast } from 'react-toastify';

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
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  // 게임메이트 등록하기 Mutation
  const mateRegisterMutation = useMutation({
    mutationFn: async (mateInfo: FormData) => {
      const response = await mateApi.registerGameMate(mateInfo);
      return { data: response.data };
    },
    onSuccess: ({ data }) => {
      const value: UserResponse | undefined = queryClient.getQueryData(['user', user.id]);
      toast.success('게임메이트 신청이 완료되었습니다.');

      if (value) {
        const shallowResults = [...value.results];
        shallowResults.push(data); // 배열에 새 데이터 추가
        queryClient.setQueryData(['user', user.id], { ...value, results: shallowResults });
      }
    },
    onError: (error) => {
      console.error(error);
    },
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

    mateRegisterMutation.mutate(data);
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
              disabled={mateRegisterMutation.isPending}
              className={`mt-4 flex h-[50px] items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-[#FFD800] to-[#D5FFB7] font-semibold ${mateRegisterMutation.isPending ? 'opacity-50' : null}`}
            >
              {mateRegisterMutation.isPending ? <Spinner w={24} h={24} /> : null}
              <span>게임메이트 신청하기</span>
            </button>
          )}
        </form>
      )}
    </div>
  );
}
