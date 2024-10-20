export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const formatTime = (dateString: Date) => {
  return new Date(dateString).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
};

export const formatYear = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isNewDay = (currentDate: string, lastDate: string | null) => {
  return currentDate !== lastDate;
};

export const isSameMinute = (currentTime: string, lastTime: string | null) => {
  return currentTime === lastTime;
};
