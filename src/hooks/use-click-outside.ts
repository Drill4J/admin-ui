import { useRef, useEffect } from 'react';

export function useClickOutside(callback: () => void) {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: any) {
      if (node && node.current && node.current.contains(event.target)) {
        return;
      }
      callback();
    }
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
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
