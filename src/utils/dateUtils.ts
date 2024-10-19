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

export const formatDay = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
};
