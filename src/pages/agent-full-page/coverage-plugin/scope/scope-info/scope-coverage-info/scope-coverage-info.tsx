import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  MainProgressBar, Legends,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';

import styles from './scope-coverage-info.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope | null;
}

const scopeCoverageInfo = BEM(styles);

export const ScopeCoverageInfo = scopeCoverageInfo(({ className, scope }: Props) => {
  const {
    coverage: { percentage: coveragePercentage = 0, overlap: { percentage: overlapCoverage = 0 } = {} } = {},
  } = scope || {};
  const uniqueCodeCoverage = percentFormatter(coveragePercentage) - percentFormatter(overlapCoverage);
  return (
    <div className={className}>
      <Title data-test="active-scope-info:title">SCOPE COVERAGE</Title>
      <CoverageInfo>
        <ScopeCoverage data-test="active-scope-info:scope-coverage">{`${percentFormatter((coveragePercentage))}%`}</ScopeCoverage>
        <b data-test="active-scope-info:overlap-coverage">{`${percentFormatter(overlapCoverage)}%`}</b>&nbsp;overlapped with build.&nbsp;
        <b data-test="active-scope-info:unique-coverage">
          {`${percentFormatter(uniqueCodeCoverage)}%`}
        </b>&nbsp;of new coverage
      </CoverageInfo>
      <MainProgressBar type="primary" value={`${coveragePercentage}%`} />
      <Legends />
    </div>
  );
});

const Title = scopeCoverageInfo.title('div');
const CoverageInfo = scopeCoverageInfo.coverageInfo('div');
const ScopeCoverage = scopeCoverageInfo.scopeCoverage('div');
