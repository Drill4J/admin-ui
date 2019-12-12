import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { percentFormatter, camelToTitle } from 'utils';

import styles from './section-tooltip.module.scss';

interface Props {
  className?: string;
  data: { [label: string]: { value?: number; count?: number; color: string } };
  hideValue?: boolean;
}

const sectionTooltip = BEM(styles);

export const SectionTooltip = sectionTooltip(({ className, data, hideValue }: Props) => {
  return (
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
  );
});

const TooltipItem = sectionTooltip.tooltipItem(Panel);
const TooltipItemIcon = sectionTooltip.tooltipItemIcon(
  span({ style: {} } as { style?: { [key: string]: string } }),
);
const TooltipItemValue = sectionTooltip.tooltipItemValue('span');
