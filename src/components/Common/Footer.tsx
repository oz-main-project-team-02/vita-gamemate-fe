export default function Footer() {
  return (
    <footer className='bg-gray-400'>
      <div className='flex py-8 max-w-[1280px] m-auto justify-around'>
        <div>
          <div className='text-white font-semibold text-2xl mb-4'>
            VI<span className='text-primary'>TA</span>
          </div>
          <div className='text-gray-300 text-sm flex flex-col gap-2'>
            <p>비타 | CEO 김비타</p>
            <p>2024-대구수성-0000호 | afs_style@naver.com</p>
            <p>11, Daegu-ro-11-gil, Suseong-gu, Daegu, Republic of Korea</p>
            <p className='mb-14'>이용약관 | 개인정보 처리방침</p>
            <p>Copyright ⓒ VITA All rights Reserve. </p>
          </div>
        </div>
        <div className='text-gray-300 text-sm flex flex-col gap-3'>
          <h2 className='text-2xl text-white font-semibold'>시작</h2>
          <p>홈페이지</p>
          <p>모든서비스</p>
        </div>
        <div className='text-gray-300 text-sm flex flex-col gap-3'>
          <h2 className='text-2xl text-white font-semibold'>회사</h2>
          <p>회사소개</p>
          <p>고객센터에 문의하기</p>
          <p>추천 계획</p>
          <p>프라이버시 정책</p>
          <p>서비스약관</p>
        </div>
      </div>
    </footer>
  );
}
