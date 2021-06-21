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
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { percentFormatter } from 'utils';
import { ClickableCell } from '../clickable-cell';

interface Props {
  value: number;
}

export const CoverageCell = ({ value = 0 }: Props) => (
  <div tw="leading-64">
    <ClickableCell disabled>
      {value === 0 && (
        <span
          tw="flex items-center mr-2 text-orange-default pointer-events-auto"
          title="Test didn't cover any methods. Make sure the test is actual or modify/delete it."
        >
          <Icons.UncoveredMethods />
        </span>
      )}
      {percentFormatter(value)}
    </ClickableCell>
  </div>
);
