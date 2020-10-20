import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Legends } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { BuildCoverage } from 'types/build-coverage';
import { AgentStatus } from 'types/agent-status';
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
  const {
    coverage: {
      percentage: coveragePercentage = 0,
      methodCount: { covered: coveredMethods = 0 } = {},
      overlap: { percentage: overlapPercentage = 0, methodCount: { covered: overlapCoveredMethods = 0 } = {} } = {},
    } = {},
  } = scope || {};
  const {
    percentage: buildCodeCoverage = 0,
    finishedScopesCount = 0,
    methodCount: { covered: buildCoveredMethods = 0 } = {},
  } = buildCoverage;
  const uniqueMethods = coveredMethods - overlapCoveredMethods;
  const uniqueCodeCoverage = percentFormatter(coveragePercentage) - percentFormatter(overlapPercentage);
  const buildDiff = percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
  return (
    <div className={className}>
      <Panel align="space-between">
        <Title data-test="active-build-coverage-info:title">BUILD COVERAGE</Title>
        <span>
          <BuildCoverageType type="build">Build</BuildCoverageType>
          <BuildCoverageType type="overlapping">Build / Scope overlap</BuildCoverageType>
          <BuildCoverageType type="scope">Scope</BuildCoverageType>
        </span>
      </Panel>
      <BuildCoverageStatus data-test="active-build-coverage-info:status">
        <BuildCoveragePercentage data-test="active-build-coverage-info:build-coverage-percentage">
          {percentFormatter(buildCodeCoverage)}%
        </BuildCoveragePercentage>
        {finishedScopesCount > 0 && (
          <Panel align="space-between">
            {previousBuildVersion && (
              <span data-test="active-build-coverage-info:comparing">
                <b>
                  {buildDiff >= 0 ? '+' : '-'}
                  {percentFormatter(Math.abs(buildDiff))}%
                  &nbsp;
                </b>
                сomparing to Build:&nbsp;
                {previousBuildVersion}
              </span>
            )}
            {Boolean(coveragePercentage) && (
              <span>
                <UniqueCoveragePercentage data-test="active-build-coverage-info:unique-coverage-percentage">
                  +{percentFormatter(uniqueCodeCoverage)}%
                </UniqueCoveragePercentage>
                &nbsp;in active scope
              </span>
            )}
          </Panel>
        )}
        {status === 'BUSY' && 'Loading...'}
        {(finishedScopesCount === 0 && status === 'ONLINE') &&
            'Press “Finish active scope” button to add your scope coverage to the build.'}
      </BuildCoverageStatus>
      <MultiProgressBar
        buildCodeCoverage={buildCodeCoverage}
        uniqueCodeCoverage={percentFormatter(uniqueCodeCoverage)}
        overlappingCode={overlapPercentage}
        methods={{ overlapCoveredMethods, buildCoveredMethods, uniqueMethods }}
        active={loading}
      />
      <Legends />
    </div>
  );
});

const Title = activeBuildCoverageInfo.title('div');
const BuildCoverageStatus = activeBuildCoverageInfo.buildCoverageStatus('div');
const BuildCoverageType = activeBuildCoverageInfo.buildCoverageType('span');
const BuildCoveragePercentage = activeBuildCoverageInfo.buildCoveragePercentage('div');
const UniqueCoveragePercentage = activeBuildCoverageInfo.uniqueCoveragePercentage('span');
