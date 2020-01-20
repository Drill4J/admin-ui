import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { percentFormatter } from 'utils';
import { Coverage } from 'types/coverage';
import { Card, CardSection } from '../card';
import { CoveragesByType } from './coverages-by-type';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  coverage: Coverage;
  additionalInfo?: React.ReactNode;
  showRecording?: boolean;
  testContext?: string;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(
  ({
    className,
    header,
    coverage: { coverage = 0, arrow, coverageByType = {} },
    additionalInfo,
    showRecording,
    testContext,
  }: Props) => (
    <div className={className}>
      <Card header={header}>
        <CardSection>
          <TotalCoverage>
            <Panel data-test={`code-coverage-card:${testContext}`}>
              {`${percentFormatter(coverage)}%`}
              {arrow && <ArrowIcon rotate={arrow === 'INCREASE' ? 180 : 0} type={arrow} />}
            </Panel>
          </TotalCoverage>
          <AdditionalInfo>{additionalInfo}</AdditionalInfo>
        </CardSection>
        <CardSection>
          <CoveragesByType
            testContext={testContext}
            coverageByType={coverageByType}
            showRecording={showRecording}
          />
        </CardSection>
      </Card>
    </div>
  ),
);

const TotalCoverage = codeCoverageCard.totalCoverage('div');
const ArrowIcon: React.FC<{
  rotate: number;
  type: 'INCREASE' | 'DECREASE';
}> = codeCoverageCard.arrowIcon(Icons.CoverageArrow);
const AdditionalInfo = codeCoverageCard.additionalInfo('div');
