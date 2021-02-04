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
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { TabsPanel, Tab } from 'components';
import { useActiveScope, useAgent, useBuildVersion } from 'hooks';
import { TableActionsProvider } from 'modules';
import { ParentBuild } from 'types/parent-build';
import { AGENT_STATUS } from 'common/constants';
import { CoveragePluginHeader } from '../coverage-plugin-header';
import { CoverageDetails } from '../coverage-details';
import { BuildProjectMethods } from './build-project-methods';
import { usePluginState } from '../../store';
import { Tests } from '../tests';
import { ActiveScopeInfo } from './active-scope-info';
import { usePreviousBuildCoverage } from '../use-previous-build-coverage';
import { BuildProjectTests } from './build-project-tests';

import styles from './overview.module.scss';

interface Props {
  className?: string;
}

const overview = BEM(styles);

export const Overview = overview(({ className }: Props) => {
  const [selectedTab, setSelectedTab] = useState('methods');
  const { agentId, loading } = usePluginState();
  const { status } = useAgent(agentId) || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const {
    percentage: previousBuildCodeCoverage = 0,
    byTestType: previousBuildTests = [],
  } = usePreviousBuildCoverage(previousBuildVersion) || {};
  const scope = useActiveScope();

  return (
    <div className={className}>
      <CoveragePluginHeader previousBuildTests={previousBuildTests} />
      <RoutingTabsPanel>
        <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="methods">
            <TabIconWrapper>
              <Icons.Function />
            </TabIconWrapper>
            Build methods
          </Tab>
          <Tab name="tests">
            <TabIconWrapper>
              <Icons.Test width={16} />
            </TabIconWrapper>
            Build tests
          </Tab>
        </TabsPanel>
      </RoutingTabsPanel>
      <InfoPanel>
        <SummaryPanel className="d-flex flex-column align-items-stretch w-full">
          {selectedTab === 'methods'
            ? (
              <BuildProjectMethods
                scope={scope}
                previousBuildInfo={{ previousBuildVersion, previousBuildCodeCoverage }}
                loading={loading}
                status={status}
              />
            )
            : <BuildProjectTests />}
        </SummaryPanel>
        {scope?.active && status === AGENT_STATUS.ONLINE && <ActiveScopeInfo scope={scope} />}
      </InfoPanel>
      <TabContent>
        {selectedTab === 'methods' ? (
          <>
            <TableActionsProvider>
              <CoverageDetails
                topic="/build/coverage/packages"
                associatedTestsTopic="/build/associated-tests"
                classesTopicPrefix="build"
              />
            </TableActionsProvider>
          </>
        ) : <Tests />}
      </TabContent>
    </div>
  );
});

const InfoPanel = overview.infoPanel('div');
const SummaryPanel = overview.summaryPanel('div');
const RoutingTabsPanel = overview.routingTabsPanel('div');
const TabContent = overview.tabContent('div');
const TabIconWrapper = overview.tabIconWrapper('div');
