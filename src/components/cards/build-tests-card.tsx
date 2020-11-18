import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './cards.module.scss';

interface Props {
  className?: string;
  percentage?: number;
  totalCount?: number;
  label: string;
}

export const BuildTestsCard = BEM(styles)(({
  className, percentage = 0, label, totalCount = 0,
}: Props) => (
  <Panel className={className} direction="column" align="space-between">
    <Panel align="space-between">
      <Label data-test={`build-tests:label:${label}`}>{label}</Label>
      <TotalCount>{totalCount}</TotalCount>
    </Panel>
    <Percentage>{percentFormatter(percentage)}% <MethodsCovered>methods covered</MethodsCovered></Percentage>
  </Panel>
));

const Label = BEM(styles).label('span');
const TotalCount = BEM(styles).totalCount('span');
const Percentage = BEM(styles).percentage('span');
const MethodsCovered = BEM(styles).methodsCovered('span');
