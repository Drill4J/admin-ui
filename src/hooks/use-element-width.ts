import { useState, useEffect } from 'react';

export function useElementWidth<E extends HTMLElement>(ref: React.RefObject<E>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref && ref.current;
    function handleResize() {
      if (ref && ref.current) {
        const { width: elementWidth } = ref.current.getBoundingClientRect();
        setWidth(elementWidth);
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

  return width;
}
