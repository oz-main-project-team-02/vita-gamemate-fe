import { Games, GenderArr, getGame, SortArr } from '@/config/const';
import RadioButtonGroup from './RadioButtonGroup';
import CheckBoxButtonGroup from './CheckBoxButtonGroup';

type Props = {
  gameId: string;
  sortValue: string;
  setSortValue: (value: string) => void;
  genderValue: string;
  setGenderValue: (value: string) => void;
  levelValue: string[];
  setLevelValue: (value: string[]) => void;
};

export default function FilterSidebar({
  gameId,
  sortValue,
  setSortValue,
  genderValue,
  setGenderValue,
  levelValue,
  setLevelValue,
}: Props) {
  return (
    <div className='flex w-[240px] flex-col gap-6 bg-[#e2e2e2] px-[20px] py-[30px]'>
      <RadioButtonGroup label='정렬' options={SortArr} selectedValue={sortValue} setSelectedValue={setSortValue} />
      <RadioButtonGroup
        label='성별'
        options={GenderArr}
        selectedValue={genderValue}
        setSelectedValue={setGenderValue}
      />
      <CheckBoxButtonGroup gameId={gameId} label='등급' selectedValue={levelValue} setSelectedValue={setLevelValue} />
    </div>
  );
}
