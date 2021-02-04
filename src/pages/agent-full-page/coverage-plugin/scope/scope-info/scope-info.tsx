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
import { useContext, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Redirect, useParams } from 'react-router-dom';
import {
  Icons, Menu, Button, SessionIndicator,
} from '@drill4j/ui-kit';

import {
  TabsPanel, Tab,
} from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { TestCoverageInfo } from 'types/test-coverage-info';
import { TableActionsProvider } from 'modules';
import { useAgent, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { ScopeProjectMethods } from './scope-project-methods';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeStatus } from './scope-status';
import { ScopeProjectTests } from './scope-project-tests';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
}

interface MenuItemType {
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(
  ({
    className,
  }: Props) => {
    const { showMessage } = useContext(NotificationManagerContext);
    const { agentId, loading } = usePluginState();
    const { buildVersion: activeBuildVersion = '', status } = useAgent(agentId) || {};
    const { pluginId = '', scopeId = '', buildVersion } = useParams<{ pluginId: string, scopeId: string, buildVersion: string }>();
    const dispatch = useCoveragePluginDispatch();
    const scope = useBuildVersion<ActiveScope>(`/scope/${scopeId}`);
    const tests = useBuildVersion<TestCoverageInfo[]>(`/scope/${scopeId}/tests`) || [];
    const {
      name = '', active = false, enabled = false, started = 0, finished = 0,
    } = scope || {};

    const [selectedTab, setSelectedTab] = useState('coverage');
    const menuActions = [
      !active && {
        label: `${enabled ? 'Ignore' : 'Include'} in stats`,
        icon: enabled ? 'EyeCrossed' : 'Eye',
        onClick: () => toggleScope(agentId, pluginId, {
          onSuccess: () => {
            showMessage({
              type: 'SUCCESS',
              text: `Scope has been ${enabled ? 'ignored' : 'included'} in build stats.`,
            });
          },
          onError: () => {
            showMessage({
              type: 'ERROR',
              text: 'There is some issue with your action. Please try again later',
            });
          },
        })(scopeId),
      },
      active && {
        label: 'Sessions Management',
        icon: 'ManageSessions',
        onClick: () => dispatch(openModal('SessionsManagementModal', null)),
      },
      {
        label: 'Rename',
        icon: 'Edit',
        onClick: () => dispatch(openModal('RenameScopeModal', scope)),
      },
      {
        label: 'Delete',
        icon: 'Delete',
        onClick: () => dispatch(openModal('DeleteScopeModal', scope)),
      },
    ].filter(Boolean);
    const newBuildHasAppeared = activeBuildVersion && buildVersion && activeBuildVersion !== buildVersion;

    return (
      scope && !scope?.coverage.percentage && newBuildHasAppeared
        ? <Redirect to={{ pathname: `/full-page/${agentId}/${activeBuildVersion}/${pluginId}/dashboard` }} />
        : (
          <div className={className}>
            <Header>
              <ScopeName data-test="scope-info:scope-name" title={name}>{name}</ScopeName>
              {status === AGENT_STATUS.ONLINE && (
                <div className="d-flex align-items-center w-full">
                  {active && <ScopeSessionIndicator active={loading} />}
                  <ScopeStatus active={active} loading={loading} enabled={enabled} started={started} finished={finished} />
                </div>
              )}
              <div className="d-flex justify-content-end align-items-center w-full">
                {active && status === AGENT_STATUS.ONLINE && (
                  <FinishScopeButton
                    className="d-flex gx-2"
                    type="primary"
                    size="large"
                    onClick={() => dispatch(openModal('FinishScopeModal', scope))}
                    data-test="scope-info:finish-scope-button"
                  >
                    <Icons.Complete />
                    <span>Finish Scope</span>
                  </FinishScopeButton>
                )}
                {activeBuildVersion === buildVersion && status === AGENT_STATUS.ONLINE
                  && <Menu items={menuActions as MenuItemType[]} />}
              </div>
            </Header>
            <RoutingTabsPanel className="d-flex align-items-center w-full">
              <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
                <Tab name="coverage">
                  <TabIconWrapper>
                    <Icons.Function />
                  </TabIconWrapper>
                  Scope methods
                </Tab>
                <Tab name="tests">
                  <TabIconWrapper>
                    <Icons.Test width={16} />
                  </TabIconWrapper>
                  Scope tests
                </Tab>
              </TabsPanel>
            </RoutingTabsPanel>
            <TabContent>
              {selectedTab === 'coverage' ? (
                <>
                  <ScopeProjectMethods scope={scope} />
                  <TableActionsProvider>
                    <CoverageDetails
                      topic={`/scope/${scopeId}/coverage/packages`}
                      associatedTestsTopic={`/scope/${scopeId}/associated-tests`}
                      classesTopicPrefix={`scope/${scopeId}`}
                    />
                  </TableActionsProvider>
                </>
              ) : (
                <>
                  <ScopeProjectTests scopeId={scopeId} />
                  <TestDetails
                    tests={tests}
                    topicCoveredMethodsByTest={`/scope/${scopeId}/tests/covered-methods`}
                  />
                </>
              )}
            </TabContent>
          </div>
        )
    );
  },
);

const Header = scopeInfo.header('div');
const ScopeName = scopeInfo.scopeName('div');
const ScopeSessionIndicator = scopeInfo.scopeSessionIndicator(SessionIndicator);
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const RoutingTabsPanel = scopeInfo.routingTabsPanel('div');
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
const TabContent = scopeInfo.tabContent('div');
