import { useState } from 'react';

export default function FilterSidebar() {
  const [sort, setSort] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const sortArr = ['추천순', '신규 가입', '최고 평가', '최저 가격', '최고 가격'];
  // const sortArr1 = [{ type: '추천순', api: '/api/v1/mates/1' }, '신규 가입', '최고 평가', '최저 가격', '최고 가격'];
  const genderArr = ['모두', '여성', '남성'];

  return (
    <div className='flex w-[240px] flex-col gap-6 bg-[#e2e2e2] px-[20px] py-[30px]'>
      {/* 왼쪽 뎁스 1 */}
      <div>
        <div className='text-[#8A8C99]'>정렬</div>
        {sortArr.map((v, i) => (
          <div key={i}>
            <input type='radio' id={`sort${i + 1}`} value={v} checked={sort === v} onChange={() => setSort(v)} hidden />
            <label htmlFor={`sort${i + 1}`} className='mt-3 flex items-center gap-2'>
              <img
                src={sort === v ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
                alt='라디오 버튼 아이콘'
              />
              <span className='text-sm text-[#525566]'>{v}</span>
            </label>
          </div>
        ))}
      </div>
      {/* 왼쪽 뎁스 2 */}
      <div>
        <div className='text-[#8A8C99]'>성별</div>
        {genderArr.map((v, i) => (
          <div key={i}>
            <input
              type='radio'
              id={`gender${i + 1}`}
              value={v}
              checked={gender === v}
              onChange={() => setGender(v)}
              hidden
            />
            <label htmlFor={`gender${i + 1}`} className='mt-3 flex items-center gap-2'>
              <img
                src={gender === v ? '/src/assets/imgs/radioTrue.svg' : '/src/assets/imgs/radioFalse.svg'}
                alt='라디오 버튼 아이콘'
              />
              <span className='text-sm text-[#525566]'>{v}</span>
            </label>
          </div>
        ))}
      </div>
      {/* TODO: 티어별 데이터 타입 정렬 할껀지? */}
    </div>
  );
}
