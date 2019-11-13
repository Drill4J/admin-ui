import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { PageHeader, Icons, Tab, TabsPanel } from '../../components';
import { Panel } from '../../layouts';
import { Button } from '../../forms';
import { useAgent } from '../../hooks';
import { AGENT_STATUS } from '../../common/constants';
import { NotificationManagerContext } from '../../notification-manager';
import { GeneralSettingsForm } from './general-settings-form';
import { SystemSettingsForm } from './system-setting-form';
import { UnregisterAgentModal } from './unregister-agent-modal';

import styles from './agent-settings-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentSettingsPage = BEM(styles);

export const AgentSettingsPage = withRouter(
  agentSettingsPage(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const agent = useAgent(agentId, () => push('/not-found')) || {};
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [isUnregisterModalOpen, setIsUnregisterModalOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('general');

    return (
      <div className={className}>
        <PageHeader
          title={
            <Panel>
              <HeaderIcon height={20} width={20} /> Settings: {agent.name ? agent.name : agent.id}
            </Panel>
          }
          actions={
            <Panel align="end">
              {agent.status !== AGENT_STATUS.NOT_REGISTERED && (
                <UnregisterAgentButton
                  type="secondary"
                  onClick={() => setIsUnregisterModalOpen(true)}
                  data-test="agent-settings-page:unregister-button"
                >
                  Unregister
                </UnregisterAgentButton>
              )}
            </Panel>
          }
        />
        <Tabs activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="general">General</Tab>
          <Tab name="system">System</Tab>
        </Tabs>

        {selectedTab === 'general' ? (
          <GeneralSettingsForm agent={agent} showMessage={showMessage} />
        ) : (
          <SystemSettingsForm agent={agent} showMessage={showMessage} />
        )}
        {isUnregisterModalOpen && (
          <UnregisterAgentModal
            isOpen={isUnregisterModalOpen}
            onToggle={setIsUnregisterModalOpen}
            agentId={agentId}
          />
        )}
      </div>
    );
  }),
);

const HeaderIcon = agentSettingsPage.headerIcon(Icons.Settings);
const UnregisterAgentButton = agentSettingsPage.unregisterAgentButton(Button);
const Tabs = agentSettingsPage.tabsPanel(TabsPanel);
