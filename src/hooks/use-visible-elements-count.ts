import { useEffect, useState } from 'react';

export function useVisibleElementsCount<E extends HTMLElement>(ref: React.RefObject<E>, initialVisivleElementsCount: number, step: number) {
  const [visibleElementsCount, setVisibleElementsCount] = useState(initialVisivleElementsCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisibleElementsCount((prevCount) => prevCount + step),
      {
        root: null,
        threshold: 1.0,
      },
    );

    ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, initialVisivleElementsCount, step]);

  return visibleElementsCount;
}
