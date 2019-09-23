import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../layouts';
import { Icons } from '../../../../components';
import { percentFormatter } from '../../../../utils';
import { Card, CardSection } from '../card';
import { CoveragesByType } from './coverages-by-type';
import { Coverage } from '../../../../types/coverage';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  coverage: Coverage;
  additionalInfo?: React.ReactNode;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(
  ({
    className,
    header,
    coverage: { coverage = 0, arrow, coverageByType = {} },
    additionalInfo,
  }: Props) => (
    <div className={className}>
      <Card header={header}>
        <CardSection header="TOTAL">
          <TotalCoverage>
            <Panel>
              {`${percentFormatter(coverage)}%`}
              {arrow && <ArrowIcon rotate={arrow === 'INCREASE' ? 180 : 0} type={arrow} />}
            </Panel>
          </TotalCoverage>
          <AdditionalInfo>{additionalInfo}</AdditionalInfo>
        </CardSection>
        <CardSection header="BY TEST TYPE">
          <CoveragesByType coverageByType={coverageByType} />
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
