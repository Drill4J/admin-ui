import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { Count } from 'types/count';

import styles from './methods-tooltip.module.scss';

const methodsTooltip = BEM(styles);

interface Props {
  className?: string;
  coveredMethods: Count;
}

export const MethodsTooltip = methodsTooltip(({ className, coveredMethods: { covered = 0, total = 0 } }: Props) => (
  <div className={className}>
    <Panel>
      <div>covered methods: {covered}/{total}</div>
      <Percent>{percentFormatter((covered / total) * 100)}%</Percent>
    </Panel>
  </div>
));

const Percent = methodsTooltip.percent('div');
