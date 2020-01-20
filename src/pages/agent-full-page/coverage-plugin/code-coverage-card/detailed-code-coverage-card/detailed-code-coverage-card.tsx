import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { percentFormatter } from 'utils';
import { Coverage } from 'types/coverage';
import { CoverageDistribution } from './coverage-distribution';

import styles from './detailed-code-coverage-card.module.scss';

interface Props {
  className?: string;
  coverage: Coverage;
  additionalInfo?: React.ReactNode;
  header?: React.ReactNode;
  showRecording?: boolean;
}

const detailedCodeCoverageCard = BEM(styles);

export const DetailedCodeCoverageCard = detailedCodeCoverageCard(
  ({
    className,
    coverage: { coverage = 0, arrow, coverageByType = {} },
    additionalInfo,
    header,
    showRecording,
  }: Props) => (
    <div className={className}>
      <Header>{header}</Header>
      <Content>
        <TotalCoverageWrapper>
          <TotalCoverage>
            <Panel>
              {`${percentFormatter(coverage)}%`}
              {arrow && <ArrowIcon rotate={arrow === 'INCREASE' ? 180 : 0} type={arrow} />}
            </Panel>
          </TotalCoverage>
          <AdditionalInfo>{additionalInfo}</AdditionalInfo>
        </TotalCoverageWrapper>
        <DistributionWrapper>
          <CoverageDistribution coverageByType={coverageByType} showRecording={showRecording} />
        </DistributionWrapper>
      </Content>
    </div>
  ),
);

const Header = detailedCodeCoverageCard.header('div');
const Content = detailedCodeCoverageCard.content('div');
const TotalCoverageWrapper = detailedCodeCoverageCard.totalCoverageWrapper('div');
const TotalCoverage = detailedCodeCoverageCard.totalCoverage('div');
const ArrowIcon: React.FC<{
  rotate: number;
  type: 'INCREASE' | 'DECREASE';
}> = detailedCodeCoverageCard.arrowIcon(Icons.CoverageArrow);
const AdditionalInfo = detailedCodeCoverageCard.additionalInfo('div');
const DistributionWrapper = detailedCodeCoverageCard.distributionWrapper('div');
