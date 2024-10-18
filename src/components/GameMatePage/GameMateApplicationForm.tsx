import { GAMES, getGame } from '@/config/const';
import debounce from '@/utils/debounce';
import { useCallback, useState } from 'react';

type Dropdown = {
  game: boolean;
  level: boolean;
};

type FormData = {
  game: string | null;
  level: string | null;
  description: string | null;
  img: string | null;
};

export default function GameMateApplicationForm() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Dropdown>({
    game: false,
    level: false,
  });
  const [formData, setFormData] = useState<FormData>({
    game: null,
    level: null,
    description: null,
    img: null,
  });

  console.log(formData);

  const toggleDropdownGame = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDropdownOpen({ ...isDropdownOpen, game: !isDropdownOpen.game });
    },
    [isDropdownOpen]
  );

  const toggleDropdownLevel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDropdownOpen({ ...isDropdownOpen, level: !isDropdownOpen.level });
    },
    [isDropdownOpen]
  );

  const handleFieldChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  const updateDescription = useCallback(
    debounce((value) => {
      setFormData((prev: FormData) => ({ ...prev, description: value }));
    }, 500),
    [setFormData]
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateDescription(e.target.value);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-semibold'>재능 선택하기</h2>
      <button
        onClick={(e) => toggleDropdownGame(e)}
        className='relative flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
      >
        <span>{formData.game ? formData.game : '게임을 선택하세요.'}</span>
        <span className='text-xl'>&gt;</span>
      </button>
      {isDropdownOpen.game && (
        <div className='mt-4 rounded-xl bg-white p-4 outline outline-gray-200'>
          <div className='flex gap-4'>
            {Object.values(GAMES).map((game, i) => (
              <div
                key={i}
                onClick={() => handleFieldChange('game', game.title)}
                className={`flex flex-1 flex-col items-center rounded-xl py-2 hover:scale-110 hover:bg-[#FFD80077] ${formData.game === game.title ? 'bg-primary' : null}`}
              >
                <div className='rounded-full bg-gray-200 p-4'>
                  <img src={game.icon} alt={`${game.title} 로고`} className='h-16 w-16' />
                </div>
                <span className={`mt-2 text-center ${formData.game === game.title ? 'font-semibold' : null}`}>
                  {game.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {formData.game && (
        <form className='flex flex-col gap-6'>
          <h2 className='text-3xl font-semibold'>{formData.game}</h2>
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
              {getGame(formData.game)?.level.map((level, i) => (
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
            <div className='flex flex-col'>
              <h2 className='text-xl font-semibold'>스크린샷 업로드</h2>
              <p className='text-gray-400'>본인의 실력을 보여줄 수 있는 사진을 업로드 해주세요.</p>
            </div>
            <button className='h-32 rounded-xl bg-white text-3xl text-gray-300 outline outline-gray-200'>+</button>
          </div>
          <button
            type='submit'
            className='mt-4 h-[50px] rounded-xl bg-gradient-to-r from-[#FFD800] to-[#D5FFB7] font-semibold'
          >
            저장
          </button>
        </form>
      )}
    </div>
  );
}
