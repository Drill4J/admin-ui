import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Legend, Panel, ProgressBarLegends } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { BuildCoverage } from 'types/build-coverage';
import { AgentStatus } from 'types/agent-status';
import { useBuildVersion } from 'hooks';
import { ParentBuild } from 'types/parent-build';
import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { MultiProgressBar } from './multi-progress-bar';

import styles from './active-build-coverage-info.module.scss';

interface Props {
  className?: string;
  buildCoverage: BuildCoverage;
  previousBuildVersion: string;
  previousBuildCodeCoverage: number;
  scope: ActiveScope | null;
  status?: AgentStatus;
  loading: boolean;
}

const activeBuildCoverageInfo = BEM(styles);

export const ActiveBuildCoverageInfo = activeBuildCoverageInfo(({
  className, buildCoverage, previousBuildVersion, previousBuildCodeCoverage, scope, status = 'BUSY', loading,
}: Props) => {
  const { version: parentBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const {
    coverage: {
      percentage: coveragePercentage = 0,
      overlap: { percentage: overlapPercentage = 0 } = {},
    } = {},
  } = scope || {};
  const {
    percentage: buildCodeCoverage = 0,
    finishedScopesCount = 0,
  } = buildCoverage;
  const uniqueCodeCoverage = percentFormatter(coveragePercentage) - percentFormatter(overlapPercentage);
  const buildDiff = percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
  return (
    <div className={className}>
      <Panel align="space-between">
        <Title data-test="active-build-coverage-info:title">BUILD COVERAGE</Title>
        <span>
          <Legend legendItems={[
            { label: 'Build', color: DATA_VISUALIZATION_COLORS.BUILD_COVER },
            {
              label: `Build / Active Scope overlap (${percentFormatter(overlapPercentage)}%)`,
              color: DATA_VISUALIZATION_COLORS.BUILD_OVERLAPPING,
            },
            {
              label: `Active Scope unique coverage (+${percentFormatter(uniqueCodeCoverage)}%)`,
              color: DATA_VISUALIZATION_COLORS.SCOPE_COVER,
            },
          ]}
          />
        </span>
      </Panel>
      <BuildCoverageStatus data-test="active-build-coverage-info:status">
        <BuildCoveragePercentage data-test="active-build-coverage-info:build-coverage-percentage">
          {percentFormatter(buildCodeCoverage)}%
        </BuildCoveragePercentage>
        {finishedScopesCount > 0 && previousBuildVersion && (
          <span data-test="active-build-coverage-info:comparing">
            <b>
              {buildDiff >= 0 ? '+' : '-'}
              {percentFormatter(Math.abs(buildDiff))}%
              &nbsp;
            </b>
            сomparing to Build:&nbsp;
            {parentBuildVersion}
          </span>
        )}
        {status === 'BUSY' && 'Loading...'}
        {(finishedScopesCount === 0 && status === 'ONLINE') &&
            'Press “Finish active scope” button to add your scope coverage to the build.'}
      </BuildCoverageStatus>
      <MultiProgressBar
        buildCodeCoverage={buildCodeCoverage}
        uniqueCodeCoverage={percentFormatter(uniqueCodeCoverage)}
        overlappingCode={overlapPercentage}
        active={loading}
      />
      <ProgressBarLegends />
    </div>
  );
});

const Title = activeBuildCoverageInfo.title('div');
const BuildCoverageStatus = activeBuildCoverageInfo.buildCoverageStatus('div');
const BuildCoveragePercentage = activeBuildCoverageInfo.buildCoveragePercentage('div');
