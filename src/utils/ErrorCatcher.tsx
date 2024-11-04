import { useErrorStore } from '@/config/store';
import { useEffect } from 'react';
import { showToastError } from './showToastError';
import axios from 'axios';

// INFO: 프로덕션 환경에서는 에러 데이터를 POST 요청으로 보내 로그에 저장하고 분석하는것이 좋다
const sendLogToConsole = (error: Error) => {
  console.error('Error:', error);
};

export const ErrorCatcher = () => {
  const { error } = useErrorStore();

  useEffect(() => {
    if (!error) return;

    sendLogToConsole(error);

    if (axios.isAxiosError(error) && error.response) {
      // 서버에서 내려주는 에러 메시지 추출
      const serverMessage = String(Object.values(error.response.data)[0]) || '알 수 없는 서버 에러입니다.';
      showToastError(serverMessage, 3000);
    } else if (error instanceof Error) {
      // 예측 불가능한 일반 에러
      showToastError(error.message || '알 수 없는 오류가 발생했습니다.', 3000);
    } else {
      // 예측 불가능한 일반 에러
      showToastError('알 수 없는 오류가 발생했습니다.', 3000);
      throw error;
    }
  }, [error]);

  return <></>;
};
