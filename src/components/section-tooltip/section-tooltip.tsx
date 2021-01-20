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
import { BEM, span } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import { percentFormatter, camelToTitle } from 'utils';

import styles from './section-tooltip.module.scss';

interface Props {
  className?: string;
  data: { [label: string]: { value?: number; count?: number; color: string } };
  hideValue?: boolean;
}

const sectionTooltip = BEM(styles);

export const SectionTooltip = sectionTooltip(({ className, data, hideValue }: Props) => (
  <div className={className}>
    {Object.keys(data).map((label) => (
      <TooltipItem align="space-between" key={label}>
        <Panel>
          <TooltipItemIcon style={{ backgroundColor: data[label].color }} />
          {`${camelToTitle(label)} (${data[label].count || 0})`}
        </Panel>
        {!hideValue && (
          <TooltipItemValue>{`${percentFormatter(data[label].value || 0)}%`}</TooltipItemValue>
        )}
      </TooltipItem>
    ))}
  </div>
));

const TooltipItem = sectionTooltip.tooltipItem(Panel);
const TooltipItemIcon = sectionTooltip.tooltipItemIcon(
  span({ style: {} } as { style?: { [key: string]: string } }),
);
const TooltipItemValue = sectionTooltip.tooltipItemValue('span');
