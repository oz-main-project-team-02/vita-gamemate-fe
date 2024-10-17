import { useState } from 'react';

const TeamBattleForm = () => {
    const [textareaValue, setTextareaValue] = useState('');

    return (
        <form className='flex flex-col gap-6'>
            <h2 className='text-3xl font-semibold'>전략적 팀 전투</h2>
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl font-semibold'>게임 레벨</h2>
                <button className='h-[50px] bg-white rounded-xl text-gray-400 flex justify-between items-center p-4 outline outline-gray-200'>
                    <span>반드시 현재 레벨을 선택하세요.</span>
                    <span className='text-xl'>&gt;</span>
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-semibold'>재능 정보</h2>
                    <p className='text-gray-400'>당신의 재능과 서비스와 특별함을 소개하세요.</p>
                </div>
                <textarea
                    className='rounded-xl p-4 outline outline-gray-200 resize-none'
                    rows={5}
                    placeholder='예시) 빠르게 캐리 해줄게요!&#13;당신의 뒤를 봐주고 킬을 따게 해줄 사람이 필요하다면 저를 선택하세요.&#13;어떤 모드든지 재밌기만 하면 상관없어요 :3'
                    value={textareaValue}
                    onChange={(e) => {
                        setTextareaValue(e.target.value);
                    }}></textarea>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-semibold'>스크린샷 업로드</h2>
                    <p className='text-gray-400'>
                        본인의 실력을 보여줄 수 있는 사진을 업로드 해주세요.
                    </p>
                </div>
                <button className='bg-white h-32 rounded-xl text-3xl text-gray-300 outline outline-gray-200'>
                    +
                </button>
            </div>
            <button
                type='submit'
                className='h-[50px] rounded-xl bg-gradient-to-r from-[#FFD800] to-[#D5FFB7] font-semibold mt-4'>
                저장
            </button>
        </form>
    );
};

export default TeamBattleForm;
