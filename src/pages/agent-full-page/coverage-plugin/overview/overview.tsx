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
import { Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';
import { Route, Link, useParams } from 'react-router-dom';

import { TabsPanel, Tab } from 'components';
import {
  useActiveScope, useAgent, useBuildVersion,
} from 'hooks';
import { TableActionsProvider } from 'modules';
import { ParentBuild } from 'types/parent-build';
import { AGENT_STATUS } from 'common/constants';
import { BuildCoverage } from 'types/build-coverage';
import { CoveragePluginHeader } from '../coverage-plugin-header';
import { CoverageDetails } from '../coverage-details';
import { BuildProjectMethods } from './build-project-methods';
import { usePluginState } from '../../store';
import { BuildTests } from '../build-tests';
import { ActiveScopeInfo } from './active-scope-info';
import { usePreviousBuildCoverage } from '../use-previous-build-coverage';
import { BuildProjectTests } from './build-project-tests';

const TabIconWrapper = styled.div`
  ${tw`flex items-center mr-2 text-monochrome-black`}
`;

export const Overview = () => {
  const { agentId, loading } = usePluginState();
  const { status } = useAgent(agentId) || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const {
    percentage: previousBuildCodeCoverage = 0,
    byTestType: previousBuildTests = [],
  } = usePreviousBuildCoverage(previousBuildVersion) || {};
  const scope = useActiveScope();
  const buildCoverage = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const { pluginId = '', buildVersion = '', tab } = useParams<{ pluginId: string; buildVersion: string; tab: string}>();

  return (
    <div>
      <CoveragePluginHeader previousBuildTests={previousBuildTests} />
      <div tw="w-full">
        <TabsPanel>
          <Tab name="methods" to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/methods`}>
            <TabIconWrapper>
              <Icons.Function />
            </TabIconWrapper>
            Build methods
          </Tab>
          <Tab name="tests" to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/tests`}>
            <TabIconWrapper>
              <Icons.Test width={16} />
            </TabIconWrapper>
            Build tests
          </Tab>
        </TabsPanel>
      </div>
      <div tw="flex gap-6">
        <div tw="flex flex-col items-stretch gap-7 pt-4 w-full border-t border-monochrome-medium-tint">
          {tab === 'methods'
            ? (
              <BuildProjectMethods
                scope={scope}
                previousBuildInfo={{ previousBuildVersion, previousBuildCodeCoverage }}
                loading={loading}
                status={status}
                buildCoverage={buildCoverage}
              />
            )
            : <BuildProjectTests />}
        </div>
        {scope?.active && status === AGENT_STATUS.ONLINE && <ActiveScopeInfo scope={scope} />}
      </div>
      <div tw="mt-2">
        <TableActionsProvider key={tab}>
          {tab === 'methods' ? (
            <CoverageDetails
              topic="/build/coverage/packages"
              associatedTestsTopic="/build"
              classesTopicPrefix="build"
              showCoverageIcon={Boolean(buildCoverage?.finishedScopesCount)}
            />
          ) : <BuildTests />}
        </TableActionsProvider>
      </div>
    </div>
  );
};
