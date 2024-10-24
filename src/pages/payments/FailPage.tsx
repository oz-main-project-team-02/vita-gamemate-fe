import { Link, useSearchParams } from 'react-router-dom';

export function FailPage() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const code = searchParams.get('code');

  return (
    <div id='info' className='box_section max-w-[640px]'>
      <div className='flex flex-col items-center'>
        <img width='100px' src='https://static.toss.im/lotties/error-spot-no-loop-space-apng.png' alt='에러 이미지' />
        <h2 className='text-2xl font-semibold'>결제를 실패했어요</h2>

        <div>
          <div className='p-grid typography--p' style={{ marginTop: '50px' }}>
            <div className='p-grid-col text--left'>
              <b>에러메시지</b>
            </div>
            <div className='p-grid-col text--right' id='message'>
              {message}
            </div>
          </div>
          <div className='p-grid typography--p' style={{ marginTop: '10px' }}>
            <div className='p-grid-col text--left'>
              <b>에러코드</b>
            </div>
            <div className='p-grid-col text--right' id='code'>
              {code}
            </div>
          </div>

          <div className='p-grid-col'>
            <Link to='https://docs.tosspayments.com/guides/v2/payment-widget/integration'>
              <button className='button p-grid-col5'>연동 문서</button>
            </Link>
            <Link to='https://discord.gg/A4fRFXQhRu'>
              <button className='button p-grid-col5' style={{ backgroundColor: '#e8f3ff', color: '#1b64da' }}>
                실시간 문의
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
