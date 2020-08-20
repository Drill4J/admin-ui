import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Legends } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { BuildCoverage } from 'types/build-coverage';
import { MultiProgressBar } from '../multi-progress-bar';

import styles from './build-coverage-info.module.scss';

interface Props {
  className?: string;
  buildCoverage: BuildCoverage;
  scope: ActiveScope | null;
  status?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY' | 'OFFLINE';
  loading: boolean;
}

const buildCoverageInfo = BEM(styles);

export const BuildCoverageInfo = buildCoverageInfo(({
  className, buildCoverage, scope, status = 'BUSY', loading,
}: Props) => {
  const {
    coverage: { percentage: coveragePercentage = 0, overlap: { percentage: overlapPercentage = 0 } = {} } = {},
  } = scope || {};
  const {
    prevBuildVersion = '',
    diff = 0,
    percentage: buildCodeCoverage = 0,
    finishedScopesCount = 0,
  } = buildCoverage;
  return (
    <div className={className}>
      <Panel align="space-between">
        <Title data-test="build-coverage-info:title">BUILD COVERAGE</Title>
        <span>
          <BuildCoverageType type="build">Build</BuildCoverageType>
          <BuildCoverageType type="overlapping">Build / Scope overlap</BuildCoverageType>
          <BuildCoverageType type="scope">Scope</BuildCoverageType>
        </span>
      </Panel>
      <BuildCoverageStatus data-test="build-coverage-info:status">
        <BuildCoveragePercentage data-test="overview:build-coverage-percentage">
          {percentFormatter(buildCodeCoverage)}%
        </BuildCoveragePercentage>
        {finishedScopesCount > 0 && (
          <Panel align="space-between">
            {prevBuildVersion && (
              <span>
                <b>
                  {diff >= 0 ? '+ ' : '- '}
                  {percentFormatter(Math.abs(diff))}%
                  &nbsp;
                </b>
                сomparing to Build:&nbsp;
                {prevBuildVersion}
              </span>
            )}
            {Boolean(coveragePercentage) && (
              <span>
                <UniqueCoveragePercentage data-test="overview:unique-coverage-percentage">
                  +{percentFormatter(coveragePercentage - overlapPercentage)}%
                </UniqueCoveragePercentage>
                &nbsp;in active scope
              </span>
            )}
          </Panel>
        )}
        {status === 'BUSY' && 'Loading...'}
        {(finishedScopesCount === 0 && status === 'ONLINE') &&
            'Press “Complete active scope” button to add your scope coverage to the build.'}
      </BuildCoverageStatus>
      <MultiProgressBar
        buildCodeCoverage={buildCodeCoverage}
        uniqueCodeCoverage={coveragePercentage - overlapPercentage}
        overlappingCode={overlapPercentage}
        active={loading}
      />
      <Legends />
    </div>
  );
});

const Title = buildCoverageInfo.title('div');
const BuildCoverageStatus = buildCoverageInfo.buildCoverageStatus('div');
const BuildCoverageType = buildCoverageInfo.buildCoverageType('span');
const BuildCoveragePercentage = buildCoverageInfo.buildCoveragePercentage('div');
const UniqueCoveragePercentage = buildCoverageInfo.uniqueCoveragePercentage('span');
