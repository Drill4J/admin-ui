import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { PageHeader, Icons, Tab, TabsPanel, Menu } from '../../components';
import { Panel } from '../../layouts';
import { useAgent } from '../../hooks';
import { AGENT_STATUS } from '../../common/constants';
import { NotificationManagerContext } from '../../notification-manager';
import { GeneralSettingsForm } from './general-settings-form';
import { SystemSettingsForm } from './system-setting-form';
import { UnregisterAgentModal } from './unregister-agent-modal';
import { PluginsSettings } from './plugins-settings';
import { toggleStandby } from './toggle-standby';
import { AgentStatusToggler } from '../agents-page/agent-status-toggler';

import styles from './agent-settings-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

interface TabsComponent {
  name: string;
  component: React.ReactNode;
}

const agentSettingsPage = BEM(styles);

export const AgentSettingsPage = withRouter(
  agentSettingsPage(
    ({
      className,
      match: {
        params: { agentId },
      },
      history: { push },
    }: Props) => {
      const agent = useAgent(agentId, () => push('/not-found')) || {};
      const { showMessage } = React.useContext(NotificationManagerContext);
      const [errorMessage, setErrorMessage] = React.useState('');
      const [isUnregisterModalOpen, setIsUnregisterModalOpen] = React.useState(false);
      const [selectedTab, setSelectedTab] = React.useState('general');
      const tabsComponents: TabsComponent[] = [
        {
          name: 'general',
          component: <GeneralSettingsForm agent={agent} showMessage={showMessage} />,
        },
        {
          name: 'system',
          component: <SystemSettingsForm agent={agent} showMessage={showMessage} />,
        },
        {
          name: 'plugins',
          component: <PluginsSettings />,
        },
      ];
      return (
        <div className={className}>
          <PageHeader
            title={
              <Panel>
                <HeaderIcon height={24} width={24} />
                Agent settings
                <AgentStatus
                  status={agent.status}
                  onChange={() => toggleStandby(agent.id || '', setErrorMessage)}
                />
              </Panel>
            }
            actions={
              <Panel align="end">
                {agent.status !== AGENT_STATUS.NOT_REGISTERED && (
                  <Menu
                    bordered
                    items={[
                      {
                        label: 'Unregister',
                        icon: 'Unregister',
                        onClick: () => {
                          setIsUnregisterModalOpen(true);
                        },
                      },
                    ]}
                  />
                )}
              </Panel>
            }
          />
          {errorMessage && (
            <ErrorMessage>
              <ErrorMessageIcon />
              {errorMessage}
            </ErrorMessage>
          )}
          <Tabs activeTab={selectedTab} onSelect={setSelectedTab}>
            <Tab name="general">General</Tab>
            <Tab name="system">System</Tab>
            <Tab name="plugins">Plugins</Tab>
          </Tabs>
          {tabsComponents
            .filter(({ name }) => name === selectedTab)
            .map(({ name, component }) => (
              <TabContent key={name}>{component}</TabContent>
            ))}
          {isUnregisterModalOpen && (
            <UnregisterAgentModal
              isOpen={isUnregisterModalOpen}
              onToggle={setIsUnregisterModalOpen}
              agentId={agentId}
            />
          )}
        </div>
      );
    },
  ),
);

const HeaderIcon = agentSettingsPage.headerIcon(Icons.Settings);
const AgentStatus = agentSettingsPage.agentStatus(AgentStatusToggler);
const ErrorMessage = agentSettingsPage.errorMessage(Panel);
const ErrorMessageIcon = agentSettingsPage.errorMessageIcon(Icons.Warning);
const Tabs = agentSettingsPage.tabsPanel(TabsPanel);
const TabContent = agentSettingsPage.tabContent('div');
