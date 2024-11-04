import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';

type GenderProps = {
  gender: string | null;
  birthday: string | null;
};

export default function Gender({ gender, birthday }: GenderProps) {
  // 한국식 연나이
  const calculateAge = (gender: string | null, birthday: string | null): string | number => {
    if (birthday === null || '') {
      return gender === 'male' ? '남성' : '여성';
    }
    const today = new Date();
    const birthDate = new Date(birthday!);
    const age = today.getFullYear() - birthDate.getFullYear() + 1;
    return age;
  };

  return (
    <div
      className={`flex items-center rounded-xl pl-[7px] ${gender === 'male' ? 'bg-[#70C6FF]' : 'bg-brightPink'} text-[#FFFFFF]`}
    >
      {gender === 'male' ? <TbGenderMale size={20} /> : <TbGenderFemale size={20} />}
      <p className='w-full pl-[4px] text-sm text-white'>{calculateAge(gender, birthday)}</p>
    </div>
  );
}
