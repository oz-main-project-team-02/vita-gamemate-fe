import { client } from '@/api/client';
import { GAMES, getGame } from '@/config/const';
import debounce from '@/utils/debounce';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';

type Dropdown = {
  game: boolean;
  level: boolean;
};

type FormDataType = {
  game_id: string | null;
  level: string | null;
  description: string | null;
  image: File | null;
  request_price: number | null;
};

export default function GameMateApplicationForm() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Dropdown>({
    game: false,
    level: false,
  });
  const [formData, setFormData] = useState<FormDataType>({
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
    mutationFn: (mateInfo: FormData) => {
      return client.post('/api/v1/mates/register/', mateInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });

  // 게임선택 시 드롭다운 토글
  const toggleDropdownGame = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDropdownOpen({ ...isDropdownOpen, game: !isDropdownOpen.game });
    },
    [isDropdownOpen]
  );

  // 레벨선택시 시 드롭다운 토글
  const toggleDropdownLevel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDropdownOpen({ ...isDropdownOpen, level: !isDropdownOpen.level });
    },
    [isDropdownOpen]
  );

  // field, value 기반 FormData 업데이트 함수
  const handleFieldChange = useCallback(
    (field: keyof FormDataType, value: string | number) => {
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  // 재능정보 작성 시 상태업데이트 지연함수
  const updateDescription = debounce((value) => {
    setFormData((prev: FormDataType) => ({ ...prev, description: value }));
  }, 1000);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateDescription(e.target.value);
  };

  // 파일변경시 이미지 프리뷰
  const handleChangeFile = () => {
    if (fileRef.current?.files?.[0]) {
      const file = fileRef.current.files[0];
      const imageUrl = URL.createObjectURL(file);

      handleFieldChange('image', imageUrl);
      setPreviewImage(imageUrl);
    }
  };

  // 가격변경
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('request_price', Number(e.target.value));
  };

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
      <button
        onClick={(e) => toggleDropdownGame(e)}
        className='relative flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
      >
        <span>{formData.game_id ? formData.game_id : '게임을 선택하세요.'}</span>
        <span className='text-xl'>&gt;</span>
      </button>
      {isDropdownOpen.game && (
        <div className='mt-4 rounded-xl bg-white p-4 outline outline-gray-200'>
          <div className='flex gap-4'>
            {Object.values(GAMES).map((game, i) => (
              <div
                key={i}
                onClick={() => handleFieldChange('game_id', game.title)}
                className={`flex flex-1 flex-col items-center rounded-xl py-2 hover:scale-110 hover:bg-[#FFD80077] ${formData.game_id === game.title ? 'bg-primary' : null}`}
              >
                <div className='rounded-full bg-gray-200 p-4'>
                  <img src={game.icon} alt={`${game.title} 로고`} className='h-16 w-16' />
                </div>
                <span className={`mt-2 text-center ${formData.game_id === game.title ? 'font-semibold' : null}`}>
                  {game.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {formData.game_id && (
        <form className='flex flex-col gap-6'>
          <h2 className='text-3xl font-semibold'>{formData.game_id}</h2>
          <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>게임 레벨</h2>
            <button
              onClick={(e) => toggleDropdownLevel(e)}
              className='flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
            >
              <span>{formData.level ? formData.level : '반드시 현재 레벨을 선택하세요.'}</span>
              <span className='text-xl'>&gt;</span>
            </button>
          </div>
          {isDropdownOpen.game && isDropdownOpen.level && (
            <div className='mt-4 grid grid-cols-4 gap-y-4 rounded-xl bg-white p-4 outline outline-gray-200'>
              {getGame(formData.game_id)?.level.map((level, i) => (
                <div key={i} className='flex justify-center' onClick={() => handleFieldChange('level', level)}>
                  <div
                    className={`w-[100px] rounded-md bg-gray-200 py-2 text-center hover:scale-110 hover:bg-[#FFD80077] ${formData.level === level ? 'bg-primary font-semibold' : null}`}
                  >
                    {level}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='text-xl font-semibold'>재능 정보</h2>
              <p className='text-gray-400'>당신의 재능과 서비스와 특별함을 소개하세요.</p>
            </div>
            <textarea
              className='resize-none rounded-xl p-4 outline outline-gray-200'
              rows={5}
              placeholder='예시) 빠르게 캐리 해줄게요!&#13;당신의 뒤를 봐주고 킬을 따게 해줄 사람이 필요하다면 저를 선택하세요.&#13;어떤 모드든지 재밌기만 하면 상관없어요 :3'
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <div>
                <h2 className='text-xl font-semibold'>재능 가격</h2>
                <p className='text-gray-400'>원하는 가격을 설정하여 재능을 제공하세요.</p>
              </div>
              <input
                type='text'
                maxLength={4}
                className='flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (
                    /[0-9]/.test(e.key) === false &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete' &&
                    e.key !== 'Tab' &&
                    e.key !== 'ArrowLeft' &&
                    e.key !== 'ArrowRight'
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleChangePrice(e)}
                placeholder='코인을 입력하세요'
              />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='text-xl font-semibold'>스크린샷 업로드</h2>
              <p className='text-gray-400'>본인의 실력을 보여줄 수 있는 사진을 업로드 해주세요.</p>
            </div>
            <div className='relative flex h-72 items-center justify-center rounded-xl bg-white outline outline-gray-200'>
              <input type='file' ref={fileRef} id='file' className='hidden' onChange={handleChangeFile} />
              <label htmlFor='file' className='absolute cursor-pointer px-20 py-6 text-3xl text-gray-300'>
                +
              </label>
              {previewImage && <img src={previewImage} className='h-full object-cover' />}
            </div>
          </div>
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
