import React, { useEffect } from 'react';

export const onClickOutside = (refs: React.MutableRefObject<HTMLElement | null>[], handler: () => void) => {
  useEffect(() => {
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
  }, [refs, handler]);
};
