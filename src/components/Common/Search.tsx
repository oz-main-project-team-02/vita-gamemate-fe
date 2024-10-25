import { fetchSearchUser } from '@/api/search';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

export default function Search() {
  const [searchUser, setSearchUser] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
    fetchSearchUser(e.target.value);
  };

  return (
    <div className='flex items-center border-b border-b-primaryText'>
      <input
        value={searchUser}
        onChange={onChangeSearch}
        type='search'
        className='w-24 border-none bg-transparent p-1 focus:outline-none'
      />
      <IoSearchSharp />
    </div>
  );
}
