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
import { useState } from 'react';
import { LinkButton } from '@drill4j/ui-kit';
import 'twin.macro';

import { BuildMethodsCard } from 'components';
import { Methods } from 'types/methods';
import { ActiveScope } from 'types/active-scope';
import { BuildCoverage } from 'types/build-coverage';
import { AgentStatus } from 'types/agent-status';
import { useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { PreviousBuildInfo } from './previous-build-info-types';
import { BuildCoverageInfo } from './build-coverage-info';
import { ActiveBuildCoverageInfo } from './active-build-coverage-info';
import { RisksModal } from '../../risks-modal';

interface Props {
  scope?: ActiveScope | null;
  previousBuildInfo?: PreviousBuildInfo;
  loading?: boolean;
  status?: AgentStatus;
  buildCoverage: BuildCoverage;
}

export const BuildProjectMethods = ({
  scope,
  previousBuildInfo,
  status,
  loading,
  buildCoverage,
}: Props) => {
  const [risksFilter, setRisksFilter] = useState<string>('');
  const {
    all, new: newMethods, modified, deleted, risks,
  } = useBuildVersion<Methods>('/build/methods') || {};
  const { percentage: buildCodeCoverage = 0 } = buildCoverage;

  return (
    <div tw="flex flex-col gap-8">
      {(scope?.active && status === AGENT_STATUS.ONLINE) ? (
        <ActiveBuildCoverageInfo
          buildCoverage={buildCoverage}
          previousBuildInfo={previousBuildInfo}
          scope={scope}
          status={status}
          loading={loading}
        />
      ) : (
        <BuildCoverageInfo
          buildCodeCoverage={buildCodeCoverage}
          previousBuildInfo={previousBuildInfo}
        />
      )}
      <div tw="flex gap-2">
        <BuildMethodsCard
          totalCount={all?.total}
          covered={all?.covered}
          label="TOTAL METHODS"
          testContext="deleted-methods"
        >
          {deleted?.total} <span tw="font-regular">deleted</span>
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={newMethods?.total}
          covered={newMethods?.covered}
          label="NEW"
        >
          {Boolean(risks?.new) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('new')}
              data-test="build-project-methods:link-button:new:risks"
            >
              {risks?.new} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={modified?.total}
          covered={modified?.covered}
          label="MODIFIED"
        >
          {Boolean(risks?.modified) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('modified')}
              data-test="build-project-methods:link-button:modified:risks"
            >
              {risks?.modified} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
      </div>
      {risksFilter && (
        <RisksModal
          isOpen={Boolean(risksFilter)}
          onToggle={() => setRisksFilter('')}
          filter={risksFilter}
        />
      )}
    </div>
  );
};
