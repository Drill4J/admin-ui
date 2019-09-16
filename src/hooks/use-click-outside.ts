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
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  return node;
}
