import { getGame } from '@/config/const';
import { MateRegister } from '@/config/types';
import { SetStateAction } from 'react';

type Props = {
  isDropdownOpen: { game: boolean; level: boolean };
  setIsDropdownOpen: React.Dispatch<SetStateAction<{ game: boolean; level: boolean }>>;
  formData: MateRegister;
  setFormData: React.Dispatch<React.SetStateAction<MateRegister>>;
};

export default function LevelSection({ isDropdownOpen, setIsDropdownOpen, formData, setFormData }: Props) {
  const handleLevelModalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => ({ ...prev, level: !isDropdownOpen.level }));
  };

  return (
    <>
      <h2 className='text-3xl font-semibold'>{formData.game_id}</h2>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>게임 레벨</h2>
        <button
          onClick={(e) => handleLevelModalClick(e)}
          className='flex h-[50px] items-center justify-between rounded-xl bg-white p-4 text-gray-400 outline outline-gray-200'
        >
          <span>{formData.level ? formData.level : '반드시 현재 레벨을 선택하세요.'}</span>
          <span className='text-xl'>&gt;</span>
        </button>
      </div>
      {isDropdownOpen.game && isDropdownOpen.level && formData.game_id && (
        <div className='mt-4 grid grid-cols-1 gap-y-4 rounded-xl bg-white p-4 outline outline-gray-200 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {getGame(formData.game_id)?.level.map((level, i) => (
            <div key={i} className='flex justify-center' onClick={() => setFormData((prev) => ({ ...prev, level }))}>
              <div
                className={`w-[100px] rounded-md bg-gray-200 py-2 text-center hover:scale-110 hover:bg-[#FFD80077] ${formData.level === level ? 'bg-primary font-semibold' : null}`}
              >
                {level}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
