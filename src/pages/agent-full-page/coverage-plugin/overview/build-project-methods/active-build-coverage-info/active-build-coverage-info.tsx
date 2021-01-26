/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BEM } from '@redneckz/react-bem-helper';
import { Legend, ProgressBarLegends } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { BuildCoverage } from 'types/build-coverage';
import { AgentStatus } from 'types/agent-status';
import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { MultiProgressBar } from './multi-progress-bar';
import { PreviousBuildInfo } from '../previous-build-info-types';

import styles from './active-build-coverage-info.module.scss';

interface Props {
  className?: string;
  buildCoverage: BuildCoverage;
  previousBuildInfo?: PreviousBuildInfo;
  scope?: ActiveScope | null;
  status?: AgentStatus;
  loading?: boolean;
}

const activeBuildCoverageInfo = BEM(styles);

export const ActiveBuildCoverageInfo = activeBuildCoverageInfo(({
  className, buildCoverage,
  previousBuildInfo: { previousBuildVersion = '', previousBuildCodeCoverage = 0 } = {}, scope, status = 'BUSY', loading,
}: Props) => {
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
      <div className="d-flex justify-content-between align-items-center w-100">
        <Title data-test="active-build-coverage-info:title">BUILD COVERAGE</Title>
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
      </div>
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
            сompared to the parent build
          </span>
        )}
        {status === 'BUSY' && 'Loading...'}
        {(finishedScopesCount === 0 && status === 'ONLINE') &&
            'Press “Finish Scope” button to add your scope coverage to the build.'}
      </BuildCoverageStatus>
      <MultiProgressBar
        buildCodeCoverage={buildCodeCoverage}
        uniqueCodeCoverage={percentFormatter(uniqueCodeCoverage)}
        overlappingCode={overlapPercentage}
        active={Boolean(loading)}
      />
      <ProgressBarLegends />
    </div>
  );
});

const Title = activeBuildCoverageInfo.title('div');
const BuildCoverageStatus = activeBuildCoverageInfo.buildCoverageStatus('div');
const BuildCoveragePercentage = activeBuildCoverageInfo.buildCoveragePercentage('div');
