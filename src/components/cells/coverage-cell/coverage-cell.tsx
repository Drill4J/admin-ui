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
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ClickableCell } from '../clickable-cell';

import styles from './coverage-cell.module.scss';

interface Props {
  className?: string;
  value: number;
}

const coverageCell = BEM(styles);

export const CoverageCell = coverageCell(({ className, value = 0 }: Props) => (
  <div className={className}>
    <ClickableCell disabled>
      {value === 0 && (
        <CoverageIcon
          title="Test didn't cover any methods. Make sure the test is actual or modify/delete it."
        >
          <Icons.UncoveredMethods />
        </CoverageIcon>
      )}
      {percentFormatter(value)}
    </ClickableCell>
  </div>
));

const CoverageIcon = coverageCell.coverageIcon('span');
