import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../layouts';
import { Icons, PageHeader, TabsPanel, Tab } from '../../../components';
import { NewMethodsModal } from './new-methods-modal';
import { Dashboard } from './dashboard';
import { Scopes } from './scope';
import { Tests } from './tests';
import { PluginHeader } from './plugin-header';
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
            {selectedTab === 'dashboard' && (
              <Dashboard agentId={agentId} buildVersion={selectedBuildVersion.value} />
            )}
            {selectedTab === 'scopes' && (
              <Scopes agentId={agentId} buildVersion={selectedBuildVersion.value} />
            )}
            {selectedTab === 'tests' && (
              <Tests agentId={agentId} buildVersion={selectedBuildVersion.value} />
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
const TabIconWrapper = coveragePlugin.tabIconWrapper(Panel);
