import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../../layouts';
import { percentFormatter, camelToTitle } from '../../../../../../utils';
import { MethodsInfo } from '../../../../../../types/methods-info';

import styles from './coverage-tooltip.module.scss';

interface Props {
  className?: string;
  methods: {
    [type: string]: MethodsInfo;
  };
}

const coverageTooltip = BEM(styles);

export const CoverageTooltip = coverageTooltip(({ className, methods }: Props) => {
  return (
    <div className={className}>
      {Object.keys(methods).map((type) => (
        <MethodTypeItem align="space-between" key={type}>
          <Panel>
            <MethodTypeIcon type={type} />
            {`${camelToTitle(type)} (${methods[type].totalCount || 0})`}
          </Panel>
          <MethodTypeValue>{percentFormatter(methods[type].coveredCount || 0)}</MethodTypeValue>
        </MethodTypeItem>
      ))}
    </div>
  );
});

const MethodTypeItem = coverageTooltip.methodTypeItem(Panel);
const MethodTypeIcon = coverageTooltip.methodTypeIcon(span({} as { type?: string }));
const MethodTypeValue = coverageTooltip.value('span');
