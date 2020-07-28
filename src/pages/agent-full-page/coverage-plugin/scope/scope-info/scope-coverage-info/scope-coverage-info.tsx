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
    coverage: { ratio = 0, overlap: { percentage: overlapCoverage = 0 } = {} } = {},
  } = scope || {};
  return (
    <div className={className}>
      <Title>SCOPE COVERAGE</Title>
      <CoverageInfo>
        <ScopeCoverage data-test="active-scope-info:scope-coverage">{`${percentFormatter((ratio))}%`}</ScopeCoverage>
        <b>{`${percentFormatter(overlapCoverage)}%`}</b>&nbsp;overlapped with build.&nbsp;
        <b>{`${percentFormatter(ratio - overlapCoverage)}%`}</b>&nbsp;of new coverage
      </CoverageInfo>
      <MainProgressBar type="primary" value={`${ratio}%`} />
      <Legends />
    </div>
  );
});

const Title = scopeCoverageInfo.title('div');
const CoverageInfo = scopeCoverageInfo.coverageInfo('div');
const ScopeCoverage = scopeCoverageInfo.scopeCoverage('div');
