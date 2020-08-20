import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { BuildCoverage } from 'types/build-coverage';
import { CoverageDistribution } from './coverage-distribution';

import styles from './detailed-code-coverage-card.module.scss';

interface Props {
  className?: string;
  coverage: BuildCoverage;
  additionalInfo?: React.ReactNode;
  header?: React.ReactNode;
  showRecording?: boolean;
}

const detailedCodeCoverageCard = BEM(styles);

export const DetailedCodeCoverageCard = detailedCodeCoverageCard(
  ({
    className,
    coverage: { percentage = 0, byTestType = [], arrow },
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
              {`${percentFormatter(percentage)}%`}
              {arrow && <ArrowIcon rotate={arrow === 'INCREASE' ? 180 : 0} type={arrow} />}
            </Panel>
          </TotalCoverage>
          <AdditionalInfo>{additionalInfo}</AdditionalInfo>
        </TotalCoverageWrapper>
        <DistributionWrapper>
          <CoverageDistribution coverageByTestType={byTestType} showRecording={showRecording} />
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
