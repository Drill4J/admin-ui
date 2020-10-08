import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

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
    <TooltipItem align="space-between">
      <Panel>
        <TooltipItemTotal>total covered: {`${covered}/${total}`}</TooltipItemTotal>
        <TooltipItemTotalValue>{`${percentFormatter((covered / total) * 100)}%`}</TooltipItemTotalValue>
      </Panel>
    </TooltipItem>
    {Object.keys(testTypes).map((testType) => (
      <TooltipItem align="space-between" key={testType}>
        <TooltipItemDetails>
          {`${camelToTitle(testType)} (${testTypes[testType]
            .covered || 0}/${testTypes[testType].total || 0}`})
        </TooltipItemDetails>
        <TooltipItemValue>
          {`${percentFormatter((testTypes[testType].covered / testTypes[testType].total) * 100)}%`}
        </TooltipItemValue>
      </TooltipItem>
    ))}
  </div>
));

const TooltipItem = coverageSectionTooltip.tooltipItem(Panel);
const TooltipItemValue = coverageSectionTooltip.tooltipItemValue('span');
const TooltipItemTotal = coverageSectionTooltip.tooltipItemTotal('span');
const TooltipItemTotalValue = coverageSectionTooltip.tooltipItemTotalValue('span');
const TooltipItemDetails = coverageSectionTooltip.tooltipItemDetails('span');
