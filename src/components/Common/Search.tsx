import { GameMate } from '@/config/types';
import { mateData } from '@/mocks/handlers';
import { useEffect, useState } from 'react';

export default function Search() {
  const nicknameData = Object.values(mateData).flat(Infinity);
  const [data, setData] = useState(nicknameData);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setData(nicknameData.filter((el) => el.nickname.indexOf(search) !== -1));
  }, [search]);

  console.log(data);

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type='search'
        className='w-24 border-none bg-transparent p-1 focus:outline-none'
      />
      <ul className='r-0 absolute top-[100px] h-[100px] w-[100px] bg-white'>
        {data.map((e) => (
          <li key={e.id}>{e.nickname}</li>
        ))}
      </ul>
    </>
  );
}
