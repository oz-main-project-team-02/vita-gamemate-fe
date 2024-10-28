import { fetchSearchUser } from '@/api/search';
import { User } from '@/config/types';
import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { TiUser } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchHover, setSearchHover] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [userData, setUserData] = useState<User[]>([]);
  const navigate = useNavigate();

  // search api 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchUser.trim() === '') {
          setUserData([]);
        } else {
          const { data } = await fetchSearchUser(searchUser);
          return setUserData(data.results);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(fetchId);
  }, [searchUser]);

  const gameIdToName = (gameId: number): string => {
    switch (gameId) {
      case 1:
        return '리그오브레전드';
      case 2:
        return '오버워치';
      case 3:
        return '전략적 팀 전투';
      case 4:
        return '배틀그라운드';
      default:
        return '';
    }
  };

  return (
    <div className='relative flex items-center border-b border-b-primaryText'>
      <input
        onMouseEnter={() => setSearchHover(true)} // 검색창에 마우스가 들어가면 목록을 열도록 설정
        onMouseLeave={() => !searchUser && setSearchHover(false)} // 검색어가 없으면 마우스가 떠날 때 목록을 닫음
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
          setSearchHover(true); // 입력할 때도 목록이 열리도록 유지
        }}
        type='search'
        className='w-24 border-none bg-transparent p-1 focus:outline-none'
      />
      <IoSearchSharp />
      <div
        onMouseEnter={() => setSearchHover(true)}
        onMouseLeave={() => setSearchHover(false)}
        className='absolute right-[-20px] top-[40px] z-[25] h-[280px] w-[280px] p-5'
      >
        {searchHover ? (
          <ul
            className='relative z-[19] h-[250px] w-[240px] overflow-scroll rounded-3xl bg-white px-2 [&::-webkit-scrollbar]:hidden'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {userData.map((user) => (
              <li
                onClick={() => {
                  setSearchUser('');
                  navigate(`/user/${user.id}`);
                }}
                key={user.id}
                className='relative z-20 my-[10px] flex h-[50px] w-full cursor-pointer hover:scale-95'
              >
                <div className='h-[50px] w-[50px] rounded-full bg-slate-200'>
                  {user.profile_image ? (
                    <img
                      className='h-[50px] w-[50px] rounded-full object-cover'
                      src={user.profile_image}
                      alt='사용자 이미지'
                    />
                  ) : (
                    <TiUser size={50} />
                  )}
                </div>
                <div className='ml-[7px] w-[60%] pt-[2px] text-xs'>
                  <h1 className='mb-[4px] text-sm font-medium'>{user.nickname}</h1>
                  <p className='text-gray-400'>skill: {gameIdToName(user.mate_game_info![0].game_id)}</p>
                </div>
                <p className='absolute right-1 top-1 text-xs text-gray-400'>id: {user.id}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
