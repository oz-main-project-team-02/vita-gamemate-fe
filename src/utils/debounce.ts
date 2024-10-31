// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timerId: ReturnType<typeof setTimeout>;

  return ((...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T;
}
