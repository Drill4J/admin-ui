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
import { useState, useEffect, useRef } from 'react';

export function useIntersection<N extends HTMLElement>(threshold = 1.0) {
  const [visible, setVisible] = useState(true);
  const ref = useRef<N>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        root: null,
        threshold,
      },
    );
    ref && ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  });

  return { visible, ref };
}
