const GameSelect = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-3xl font-semibold'>게임 선택하기</h2>
            <button className='h-[50px] bg-white rounded-xl text-gray-400 flex justify-between items-center p-4 outline outline-gray-200'>
                <span>게임을 선택하세요.</span>
                <span className='text-xl'>&gt;</span>
            </button>
        </div>
    );
};

export default GameSelect;
