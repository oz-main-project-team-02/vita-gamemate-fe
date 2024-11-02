import FilterList from '@/components/Common/FilterList';
import ProfileImg from '@/components/Common/ProfileImg';
import { useUserStore } from '@/config/store';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: Props) {
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(false);
  const { user } = useUserStore();

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth >= 1200) {
        setIsFilterListOpen(true);
      } else {
        setIsFilterListOpen(false);
      }
    }, 200);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex h-full w-full transition-all duration-300 ease-in-out'>
      {/* 필터 섹션 */}
      <div
        className={`relative z-30 transition-all duration-300 ease-in-out ${
          isFilterListOpen ? 'max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]' : 'max-w-0'
        }`}
      >
        <FilterList isFilterListOpen={isFilterListOpen} setIsFilterListOpen={setIsFilterListOpen} />
      </div>
      {/* 메인 섹션 */}
      <div className={`relative flex-grow bg-gray-100 p-20 transition-all duration-300 ease-in-out`}>
        <ProfileImg />
        <div className='absolute right-[15%] lg:right-[20%] xl:right-[25%]'>
          <div className='text-2xl font-bold text-gray-500'>{user.nickname}</div>
          <div className='flex items-center text-xl font-bold text-[#898989]'>id: {user.id}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
