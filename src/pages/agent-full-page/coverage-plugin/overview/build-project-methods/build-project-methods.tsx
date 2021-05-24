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
import { Link, useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

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
import { ActiveScopeInfo } from '../active-scope-info';

interface Props {
  scope: ActiveScope | null;
  previousBuildInfo?: PreviousBuildInfo;
  loading?: boolean;
  status?: AgentStatus;
  buildCoverage: BuildCoverage;
}

const Content = styled.div`
  ${tw`grid gap-8`}
  grid-template-columns: 1fr 320px;
  @media screen and (min-width: 1024px) {
    grid-template-columns: auto max-content;
  }
`;

const Cards = styled.div<{ isShowActiveScopeInfo?: boolean }>`
  ${tw`grid gap-2 col-start-1 grid-flow-row lg:grid-cols-3`}
  ${({ isShowActiveScopeInfo }) => !isShowActiveScopeInfo && tw`col-span-2 grid-cols-3`}
`;

const ActiveBuildTestsBar = styled.div<{ isShowActiveScopeInfo?: boolean }>`
  ${tw`col-start-1 col-span-2 lg:col-span-1`}
  ${({ isShowActiveScopeInfo }) => !isShowActiveScopeInfo && tw`col-span-2 lg:col-span-2`}
`;

export const BuildProjectMethods = ({
  scope,
  previousBuildInfo,
  status,
  loading,
  buildCoverage,
}: Props) => {
  const {
    all,
    new: newMethods,
    modified,
    deleted,
    risks,
  } = useBuildVersion<Methods>('/build/methods') || {};
  const { percentage: buildCodeCoverage = 0 } = buildCoverage;
  const {
    pluginId = '',
    agentId = '',
    buildVersion = '',
    tab = '',
  } = useParams<{
    pluginId: string;
    agentId: string;
    buildVersion: string;
    tab: string;
  }>();
  const isShowActiveScopeInfo = scope?.active && status === AGENT_STATUS.ONLINE;

  return (
    <Content>
      <ActiveBuildTestsBar isShowActiveScopeInfo={isShowActiveScopeInfo}>
        {scope?.active && status === AGENT_STATUS.ONLINE ? (
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
      </ActiveBuildTestsBar>
      <Cards isShowActiveScopeInfo={isShowActiveScopeInfo}>
        <BuildMethodsCard
          totalCount={all?.total}
          covered={all?.covered}
          label="TOTAL METHODS"
          testContext="deleted-methods"
        >
          {deleted?.total} <span tw="font-regular">deleted</span>
        </BuildMethodsCard>
        <BuildMethodsCard totalCount={newMethods?.total} covered={newMethods?.covered} label="NEW">
          {Boolean(risks?.new) && (
            <Link
              tw="link"
              to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/risks-modal/?filter=new`}
              data-test="build-project-methods:link-button:new:risks"
            >
              {risks?.new} risks
            </Link>
          )}
        </BuildMethodsCard>
        <BuildMethodsCard totalCount={modified?.total} covered={modified?.covered} label="MODIFIED">
          {Boolean(risks?.modified) && (
            <Link
              tw="link"
              to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/risks-modal/?filter=modified`}
              data-test="build-project-methods:link-button:modified:risks"
            >
              {risks?.modified} risks
            </Link>
          )}
        </BuildMethodsCard>
      </Cards>
      {isShowActiveScopeInfo && (
        <div tw="lg:col-start-2 lg:row-start-1 lg:row-end-3">
          <ActiveScopeInfo scope={scope} />
        </div>
      )}
    </Content>
  );
};
