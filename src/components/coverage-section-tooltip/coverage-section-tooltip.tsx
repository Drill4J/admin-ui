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

import { camelToTitle, percentFormatter } from 'utils';

import styles from './coverage-section-tooltip.module.scss';

interface Props {
  className?: string;
  data: Record<string, { total: number, covered: number }>;
}

const coverageSectionTooltip = BEM(styles);

export const CoverageSectionTooltip = coverageSectionTooltip((
  { className, data: { totalCovered: { covered, total }, ...testTypes } }: Props,
) => (
  <div className={className}>
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center w-full">
        <TooltipItemTotal>total covered: {`${covered}/${total}`}</TooltipItemTotal>
        <TooltipItemTotalValue>{`${percentFormatter((covered / total) * 100)}%`}</TooltipItemTotalValue>
      </div>
    </div>
    {Object.keys(testTypes).map((testType) => (
      <div className="flex justify-between items-center w-full" key={testType}>
        <TooltipItemDetails>
          {`${camelToTitle(testType)} (${testTypes[testType]
            .covered || 0}/${testTypes[testType].total || 0}`})
        </TooltipItemDetails>
        <TooltipItemValue>
          {`${percentFormatter((testTypes[testType].covered / testTypes[testType].total) * 100)}%`}
        </TooltipItemValue>
      </div>
    ))}
  </div>
));

const TooltipItemValue = coverageSectionTooltip.tooltipItemValue('span');
const TooltipItemTotal = coverageSectionTooltip.tooltipItemTotal('span');
const TooltipItemTotalValue = coverageSectionTooltip.tooltipItemTotalValue('span');
const TooltipItemDetails = coverageSectionTooltip.tooltipItemDetails('span');
