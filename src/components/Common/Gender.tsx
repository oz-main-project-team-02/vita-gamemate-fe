import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

interface gender {
  gender: string,
  age: number
}

export default function Gender({gender, age}: gender) {
  return (
    <div className={`w-[43px] h-[19px] p-1 flex items-center rounded-xl ${gender === 'male' ? 'bg-[#70C6FF]' : 'bg-brightPink'} text-[#FFFFFF]`}>
      {gender === 'male' ? <TbGenderMale /> : <TbGenderFemale />}
      <p className="pl-[2px] font-medium text-xs">{age}</p>
    </div>
  )
}
