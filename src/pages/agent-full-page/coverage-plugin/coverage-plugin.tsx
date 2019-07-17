import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader, TabsPanel, Tab } from '../../../components';
import { Inputs } from '../../../forms';
import { useWsConnection } from '../../../hooks';
import { defaultAdminSocket } from '../../../common/connection';
import { Card } from './card';
import { CoverageDetails } from './coverage-details';
import { TestDetails } from './test-details';
import { useBuildVersion } from './use-build-version';
import { NewMethodsModal } from './new-methods-modal';
import { CodeCoverageCard } from './code-coverage-card';
import { ScopesList } from './scope';
import { PluginHeader } from './plugin-header';
import { Dashboard } from './dashboard';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { Agent } from '../../../types/agent';

import styles from './coverage-plugin.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
  agent?: Agent;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = withRouter(
  coveragePlugin(
    ({
      className,
      match: {
        params: { agentId },
      },
      agent: { name, buildVersion = '', buildAlias } = {},
    }: Props) => {
      const [selectedBuildVersion, setSelectedBuildVersion] = React.useState({
        value: buildVersion,
        label: `Build ${buildAlias}`,
      });
      const [isNewMethodsModalOpen, setIsNewMethodsModalOpen] = React.useState(false);
      const [selectedTab, setSelectedTab] = React.useState('dashboard');
      const coverage =
        useBuildVersion<Coverage>('/coverage', agentId, selectedBuildVersion.value) || {};
      const newMethodsCoverage =
        useBuildVersion<NewMethodsCoverage>('/coverage-new', agentId, selectedBuildVersion.value) ||
        {};
      const activeScope =
        useBuildVersion<Coverage>('/active-sessions', agentId, selectedBuildVersion.value) || {};

      React.useEffect(() => {
        setSelectedBuildVersion({
          value: buildVersion,
          label: `Build ${buildAlias || buildVersion}`,
        });
      }, [buildVersion, buildAlias]);

      return (
        <div className={className}>
          <PageHeader
            title={<span>Code Coverage Tracker </span>}
            actions={
              <Panel align="end">
                <SettingsButton>
                  <Icons.Settings />
                </SettingsButton>
              </Panel>
            }
          />
          <PluginHeader
            agentName={name}
            agentId={agentId}
            buildVersion={selectedBuildVersion}
            setBuildVersion={setSelectedBuildVersion}
          />
          <RoutingTabsPanel>
            <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
              <Tab name="dashboard">
                <TabIconWrapper>
                  <Icons.Dashboard />
                </TabIconWrapper>
                Dashboard
              </Tab>
              <Tab name="scopes">
                <TabIconWrapper>
                  <Icons.Scope />
                </TabIconWrapper>
                Scopes
              </Tab>
              <Tab name="tests">
                <TabIconWrapper>
                  <Icons.Test height={20} width={18} viewBox="0 0 20 18" />
                </TabIconWrapper>
                Tests
              </Tab>
            </TabsPanel>
          </RoutingTabsPanel>
          <Content>
            {/* <SummaryWrapper>
              <CodeCoverageCard
                coverage={coverage}
                agentId={agentId}
                buildVersion={selectedBuildVersion.value}
              />
              <Card
                title="Methods, Total"
                text={coverage.methodsCount !== undefined ? coverage.methodsCount : 'n/a'}
                secondaryText={
                  newMethodsCoverage.methodsCount !== undefined ? (
                    <NewMethods
                      onClick={() => setIsNewMethodsModalOpen(true)}
                      disabled={!Boolean(newMethodsCoverage.methodsCount)}
                    >
                      {newMethodsCoverage.methodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
                      {` ${newMethodsCoverage.methodsCount} new methods (${
                        newMethodsCoverage.methodsCovered
                      } covered)`}
                    </NewMethods>
                  ) : null
                }
              />
            </SummaryWrapper> */}
            {/* <DetailsHeader align="space-between">
              Details
              <TabsPanel activeTab={selectedTab} onSelect={setSelectedTab}>
                <Tab name="packages">
                  <TabIconWrapper>
                    <Icons.ProjectTree />
                  </TabIconWrapper>
                  Project tree
                </Tab>
                <Tab name="tests">
                  <TabIconWrapper>
                    <Icons.Test height={20} width={18} viewBox="0 0 20 18" />
                  </TabIconWrapper>
                  Tests
                </Tab>
              </TabsPanel>
            </DetailsHeader> */}
            {selectedTab === 'dashboard' && (
              <Dashboard agentId={agentId} buildVersion={buildVersion} />
            )}
            {selectedTab === 'scopes' && (
              <ScopesList agentId={agentId} buildVersion={buildVersion} />
            )}
            {selectedTab === 'tests' && (
              <TestDetails agentId={agentId} buildVersion={buildVersion} />
            )}
            {isNewMethodsModalOpen && (
              <NewMethodsModal
                agentId={agentId}
                buildVersion={selectedBuildVersion.value}
                isOpen={isNewMethodsModalOpen}
                onToggle={setIsNewMethodsModalOpen}
              />
            )}
          </Content>
        </div>
      );
    },
  ),
);

const SettingsButton = coveragePlugin.settingsButton('div');
const RoutingTabsPanel = coveragePlugin.routingTabsPanel(Panel);
const Content = coveragePlugin.content('div');
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
const ScopesHeader = coveragePlugin.scopesHeader('div');
const DetailsHeader = coveragePlugin.detailsHeader(Panel);
const TabIconWrapper = coveragePlugin.tabIconWrapper(Panel);
const WarningIcon = coveragePlugin.warningIcon(Icons.Warning);
const SuccessIcon = coveragePlugin.successIcon(Icons.Checkbox);
const NewMethods = coveragePlugin.newMethods(
  div({ onClick: () => {} } as { onClick: (arg: Event) => void; disabled?: boolean }),
);
