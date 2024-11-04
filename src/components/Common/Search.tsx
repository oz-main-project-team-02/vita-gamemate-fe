import { fetchSearchUser } from '@/api/search';
import { getGame } from '@/config/const';
import { User } from '@/config/types';
import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import userImage from '/favicon.png';
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

  return (
    <div className='relative flex items-center border-b border-b-primaryText'>
      <input
        onMouseLeave={() => !searchUser && setSearchHover(false)}
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
          setSearchHover(true);
        }}
        type='search'
        className='w-24 border-none bg-transparent p-1 focus:outline-none'
      />
      <IoSearchSharp />
      <div
        onMouseLeave={() => setSearchHover(false)}
        className='absolute right-[0px] top-[33px] z-[25] h-[280px] w-[280px] p-5'
      >
        {searchHover && (
          <ul
            onMouseEnter={() => setSearchHover(true)}
            className='relative z-[19] h-[250px] w-[260px] overflow-scroll rounded-3xl bg-white px-3 [&::-webkit-scrollbar]:hidden'
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
                  <img
                    className='h-[50px] w-[50px] rounded-full object-cover'
                    src={user.profile_image ?? userImage}
                    alt='사용자 이미지'
                  />
                </div>
                <div className='ml-[7px] w-[60%] pt-[2px] text-xs'>
                  <h1 className='mb-[4px] text-sm font-medium'>{user.nickname}</h1>
                  {user.mate_game_info!.length > 0 && (
                    <p className='truncate text-gray-400'>{`skil: ${user.mate_game_info?.map((data) => getGame(data.game_id)?.title)}`}</p>
                  )}
                </div>
                <p className='absolute right-1 top-1 text-xs text-gray-400'>id: {user.id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
