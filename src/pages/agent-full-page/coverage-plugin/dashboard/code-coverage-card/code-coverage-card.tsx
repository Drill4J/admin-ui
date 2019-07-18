import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { percentFormatter } from '../../../../../utils';
import { Card, CardSection } from '../card';
import { CoveragesByType } from './coverages-by-type';
import { Coverage } from '../../../../../types/coverage';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  coverage: Coverage;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(
  ({ className, coverage: { coverage = 0, coveragesByType = {} } }: Props) => (
    <div className={className}>
      <Card header="Build Code Coverage">
        <CardSection header="TOTAL">
          <TotalCoverage>{coverage ? `${percentFormatter(coverage)}%` : 'n/a'}</TotalCoverage>
        </CardSection>
        <CardSection header="BY TEST TYPE">
          <CoveragesByType coverageByType={coveragesByType} />
        </CardSection>
        <CardSection />
      </Card>
    </div>
  ),
);

const TotalCoverage = codeCoverageCard.totalCoverage('div');
