import { useRef, useEffect } from 'react';

export function useClickOutside(callback: () => void) {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (node && node.current && node.current.contains(event.target as HTMLElement)) {
        return;
      }
      callback();
    }
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line
  }, []);

  return node;
}
