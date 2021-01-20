/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
