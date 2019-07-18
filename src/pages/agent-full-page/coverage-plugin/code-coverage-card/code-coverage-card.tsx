import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { percentFormatter } from '../../../../utils';
import { Card, CardSection } from '../card';
import { CoveragesByType } from './coverages-by-type';
import { Coverage } from '../../../../types/coverage';
import { CoverageByTypes } from '../../../../types/coverage-by-types';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  coverage: Coverage;
  coverageByTypes: CoverageByTypes;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(
  ({ className, header, coverage: { coverage = 0 }, coverageByTypes }: Props) => (
    <div className={className}>
      <Card header={header}>
        <CardSection header="TOTAL">
          <TotalCoverage>{coverage ? `${percentFormatter(coverage)}%` : 'n/a'}</TotalCoverage>
        </CardSection>
        <CardSection header="BY TEST TYPE">
          <CoveragesByType coverageByType={coverageByTypes} />
        </CardSection>
      </Card>
    </div>
  ),
);

const TotalCoverage = codeCoverageCard.totalCoverage('div');
