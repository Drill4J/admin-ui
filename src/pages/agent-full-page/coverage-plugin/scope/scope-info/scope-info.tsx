import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Redirect, useParams } from 'react-router-dom';
import {
  Panel, Icons, Menu, Button, SessionIndicator,
} from '@drill4j/ui-kit';

import {
  TabsPanel, Tab,
} from 'components';
import { NotificationManagerContext } from 'notification-manager';
import { ActiveScope } from 'types/active-scope';
import { Methods } from 'types/methods';
import { AssociatedTests } from 'types/associated-tests';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestSummary } from 'types/test-summary';
import { TableActionsProvider } from 'modules';
import { ScopeCoverage } from 'types/scope-coverage';
import { useAgent, useBuildVersion } from 'hooks';
import { ProjectMethodsCards } from '../../project-methods-cards';
import { CoverageDetails } from '../../coverage-details';
import { TestDetails } from '../../test-details';
import { toggleScope } from '../../api';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeCoverageInfo } from './scope-coverage-info';
import { ScopeStatus } from './scope-status';
import { ProjectTestsCards } from '../../project-tests-cards';

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
    const { showMessage } = React.useContext(NotificationManagerContext);
    const { agentId, loading } = usePluginState();
    const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
    const { pluginId = '', scopeId = '', buildVersion } = useParams<{ pluginId: string, scopeId: string, buildVersion: string }>();
    const dispatch = useCoveragePluginDispatch();
    const scope = useBuildVersion<ActiveScope>(`/scope/${scopeId}`);
    const scopeMethods = useBuildVersion<Methods>(`/scope/${scopeId}/methods`) || {};
    const { packageCount: { total = 0 } = {} } = useBuildVersion<ScopeCoverage>(`/scope/${scopeId}/coverage`) || {};

    const testsUsages = useBuildVersion<AssociatedTests[]>(`/scope/${scopeId}/tests-usages`) || [];
    const allScopeTests = useBuildVersion<TestSummary>(`/scope/${scopeId}/summary/tests/all`) || {};
    const scopeTestsByType = useBuildVersion<TestTypeSummary[]>(`/scope/${scopeId}/summary/tests/by-type`) || [];

    const {
      name = '', active = false, enabled = false, started = 0, finished = 0,
    } = scope || {};

    const [selectedTab, setSelectedTab] = React.useState('coverage');
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
        label: 'Manage Sessions',
        icon: 'ManageSessions',
        onClick: () => dispatch(openModal('ManageSessionsModal', null)),
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
      !scope?.coverage.percentage && newBuildHasAppeared
        ? <Redirect to={{ pathname: `/full-page/${agentId}/${activeBuildVersion}/${pluginId}/dashboard`, state: activeBuildVersion }} />
        : (
          <div className={className}>
            <Header align="space-between">
              <Panel>
                <ScopeName data-test="scope-info:scope-name">{name}</ScopeName>
                {active && <ScopeSessionIndicator active={loading} />}
                <ScopeStatus active={active} loading={loading} enabled={enabled} started={started} finished={finished} />
              </Panel>
              <Panel align="end">
                {active && (
                  <FinishScopeButton
                    type="primary"
                    size="large"
                    onClick={() => dispatch(openModal('FinishScopeModal', scope))}
                    data-test="scope-info:finish-scope-button"
                  >
                    <Icons.Complete />
                    <span>Finish Scope</span>
                  </FinishScopeButton>
                )}
                {activeBuildVersion === buildVersion && <Menu items={menuActions as MenuItemType[]} />}
              </Panel>
            </Header>
            <ScopeCoverageInfo scope={scope} />
            <RoutingTabsPanel>
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
                  <ProjectMethodsCards methods={scopeMethods} />
                  <TableActionsProvider>
                    <CoverageDetails
                      topic={`/scope/${scopeId}/coverage/packages`}
                      associatedTestsTopic={`/scope/${scopeId}/associated-tests`}
                      classesTopicPrefix={`scope/${scopeId}`}
                      packageCount={total}
                    />
                  </TableActionsProvider>
                </>
              ) : (
                <>
                  <ProjectTestsCards allTests={allScopeTests} testsByType={scopeTestsByType} />
                  <TestDetails
                    testsUsages={testsUsages}
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

const Header = scopeInfo.header(Panel);
const ScopeName = scopeInfo.scopeName('div');
const ScopeSessionIndicator = scopeInfo.scopeSessionIndicator(SessionIndicator);
const FinishScopeButton = scopeInfo.finishScopeButton(Button);
const RoutingTabsPanel = scopeInfo.routingTabsPanel(Panel);
const TabIconWrapper = scopeInfo.tabIconWrapper('div');
const TabContent = scopeInfo.tabContent('div');
