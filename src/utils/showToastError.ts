import { toast } from 'react-toastify';

export const showToastError = (message: string, duration: number = 5000) => {
  toast.error(message || '알 수 없는 오류가 발생했습니다.', {
    autoClose: duration,
  });
};
