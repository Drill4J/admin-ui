import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { percentFormatter } from '../../../../../utils';
import { Card, CardSection } from '../card';
import { useBuildVersion } from '../../use-build-version';
import { CoveragesByType } from './coverages-by-type';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  agentId?: string;
  buildVersion?: string;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(({ className, agentId, buildVersion }: Props) => {
  const { coverage = 0, coveragesByType = {} } =
    useBuildVersion<ScopeSummary>('/build/coverage', agentId, buildVersion) || {};
  return (
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
  );
});

const TotalCoverage = codeCoverageCard.totalCoverage('div');
