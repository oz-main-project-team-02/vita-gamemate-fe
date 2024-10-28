import FilterList from '@/components/Common/FilterList';
import ProfileImg from '@/components/Common/ProfileImg';
import { useFilterListStore } from '@/config/store';

type Props = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: Props) {
  const isFilterListOpen = useFilterListStore((state) => state.isFilterListOpen);
  const setIsFilterListToggle = useFilterListStore((state) => state.setIsFilterListToggle);

  return (
    <div className='flex h-full w-full transition-all duration-300 ease-in-out'>
      {/* 필터 섹션 */}
      <div
        className={`relative z-30 transition-all duration-300 ease-in-out ${
          isFilterListOpen ? 'max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]' : 'max-w-0'
        }`}
      >
        <FilterList isFilterListOpen={isFilterListOpen} setIsFilterListToggle={setIsFilterListToggle} />
      </div>
      {/* 메인 섹션 */}
      <div className={`relative flex-grow bg-gray-100 p-20 transition-all duration-300 ease-in-out`}>
        <ProfileImg />
        {children}
      </div>
    </div>
  );
}
