import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';

type GenderProps = {
  gender: string;
  birthday: string | null;
};

export default function Gender({ gender, birthday }: GenderProps) {
  const calculateAge = (gender: string, birhday: string | null): string | number => {
    if (birhday === null) {
      return gender === 'male' ? '남성' : '여성';
    }
    const today = new Date();
    const birthDate = new Date(birhday!);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <div
      className={`mr-1 flex h-[21px] w-[53px] items-center rounded-xl pl-[7px] ${gender === 'male' ? 'bg-[#70C6FF]' : 'bg-brightPink'} text-[#FFFFFF]`}
    >
      {gender === 'male' ? <TbGenderMale size={20} /> : <TbGenderFemale size={20} />}
      <p className='w-full pl-[4px] text-sm font-light'>{calculateAge(gender, birthday)}</p>
    </div>
  );
}
