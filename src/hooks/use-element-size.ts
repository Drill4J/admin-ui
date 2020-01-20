/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useState, useEffect } from 'react';

export function useElementSize<E extends HTMLElement>(ref: React.RefObject<E>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref && ref.current;
    function handleResize() {
      if (ref && ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
      }
    }
    handleResize();
    // @ts-ignore
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect(element);
    };
  }, [ref]);

  return size;
}
