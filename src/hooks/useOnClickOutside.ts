import { useEffect } from 'react';
import { useOrderModalStore } from '@/config/store';

export const useOnClickOutside = (refs: React.MutableRefObject<HTMLElement | null>[], handler: () => void) => {
  const isOrderModalOpen = useOrderModalStore((state) => state.isOrderModalOpen);

  useEffect(() => {
    if (isOrderModalOpen) return;

    const mouseListener = (e: MouseEvent) => {
      if (refs.some((ref) => ref.current && ref.current.contains(e.target as Node))) {
        return;
      }
      handler();
    };

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('mousedown', mouseListener);
    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('mousedown', mouseListener);
      document.removeEventListener('keydown', keyListener);
    };
  }, [refs, handler, isOrderModalOpen]);
};
