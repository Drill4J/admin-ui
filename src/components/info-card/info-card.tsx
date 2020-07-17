import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import styles from './info-card.module.scss';

interface Props {
  className?: string;
  label: string;
  children?: React.ReactNode;
  covered?: number | string;
  totalCount?: number;
}

const infoCard = BEM(styles);

export const InfoCard = infoCard(({
  className, label, children, covered = 0, totalCount = 0,
}: Props) => {
  const coverage = typeof covered === 'string' ? covered : `${convertToPercentage(covered, totalCount)}%`;
  return (
    <div className={className}>
      <Panel align="space-between">
        <Label data-test={`info-card:label:${label}`}>{label}</Label>
        {children}
      </Panel>
      <div>
        <Methods align="space-between">
          <Covered data-test={`info-card:covered-count:${label}`}>{covered}</Covered>
          <TotalCount data-test={`info-card:total-methods:${label}`}>{totalCount}</TotalCount>
        </Methods>
        <CoverageBar>
          <Progress
            style={{ width: coverage }}
          />
        </CoverageBar>
      </div>
    </div>
  );
});

const Label = infoCard.label('span');
const Methods = infoCard.methods(Panel);
const Covered = infoCard.covered('span');
const TotalCount = infoCard.totalCount('span');
const CoverageBar = infoCard.coverageBar('div');
const Progress = infoCard.progress('div');

function convertToPercentage(numerator: number, denominator: number) {
  return denominator !== 0 ? (numerator / denominator) * 100 : 0;
}
