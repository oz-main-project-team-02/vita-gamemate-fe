import { GenderArr, SortArr } from '@/config/const';
import RadioButtonGroup from './RadioButtonGroup';

type Props = {
  sortValue: string;
  setSortValue: (value: string) => void;
  genderValue: string;
  setGenderValue: (value: string) => void;
};

export default function FilterSidebar({ sortValue, setSortValue, genderValue, setGenderValue }: Props) {
  return (
    <div className='flex w-[240px] flex-col gap-6 bg-[#e2e2e2] px-[20px] py-[30px]'>
      {/* 왼쪽 뎁스 1 */}
      <RadioButtonGroup label='정렬' options={SortArr} selectedValue={sortValue} setSelectedValue={setSortValue} />
      {/* 왼쪽 뎁스 2 */}
      <RadioButtonGroup
        label='성별'
        options={GenderArr}
        selectedValue={genderValue}
        setSelectedValue={setGenderValue}
      />
      {/* TODO: 티어별 데이터 타입 정렬 할껀지? */}
    </div>
  );
}
