import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import { convertToPercentage } from 'utils';

import styles from './cards.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  covered?: number;
  totalCount?: number;
  label: string;
}

export const BuildMethodsCard = BEM(styles)(({
  className, children, covered = 0, totalCount = 0, label,
}: Props) => (
  <Panel className={className} direction="column" align="space-between">
    <Panel align="space-between">
      <Label data-test={`build-methods:label:${label}`}>{label}</Label>
      <TotalCount>{totalCount}</TotalCount>
    </Panel>
    <Info>
      <Panel align="space-between">
        <Covered>{covered}</Covered>
        <span>{children}</span>
      </Panel>
      <CoverageBar>
        <Progress style={{ width: `${convertToPercentage(covered, totalCount)}%` }} />
      </CoverageBar>
    </Info>
  </Panel>
));

const Covered = BEM(styles).covered('div');
const Info = BEM(styles).info('div');
const CoverageBar = BEM(styles).coverageBar('div');
const Progress = BEM(styles).progress('div');
const Label = BEM(styles).label('span');
const TotalCount = BEM(styles).totalCount('span');
