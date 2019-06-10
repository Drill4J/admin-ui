import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { PageHeader, Icons, ItemsActions } from '../../components';
import { Button, Inputs } from '../../forms';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';
import { AGENT_STATUS } from '../../common/constants';
import { AgentPluginsTable } from './agent-plugins-table';
import { getSelectedPLuginsActions } from './get-selected-plugins-actions';
import { AddPluginsModal } from './add-plugins-modal';
import { NoPluginsStub } from './no-plugins-stub';
import { Agent } from '../../types/agent';

import styles from './agent-info-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentInfoPage = BEM(styles);

export const AgentInfoPage = withRouter(
  agentInfoPage(({ className, history: { push }, match: { params: { agentId } } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};
    const [selectedPlugins, setSelectedPlugins] = React.useState<string[]>([]);
    const [isAddPluginOpen, setIsAddPluginOpen] = React.useState(false);

    return (
      <div className={className}>
        <PageHeader
          title={
            <HeaderTitle>
              <Icons.Agents height={18} width={20} />
              <span>{agentId}</span>
              <ToggleAgent>
                <Inputs.Toggler
                  value={agent.status === AGENT_STATUS.READY}
                  label={
                    <ToggleAgentHeader>{`Drill4J ${
                      agent.status === AGENT_STATUS.READY ? 'on' : 'off'
                    }`}</ToggleAgentHeader>
                  }
                  onChange={() => toggleAgent(agent.id || '')}
                />
              </ToggleAgent>
            </HeaderTitle>
          }
          actions={
            <HeaderActions>
              <ToAgentButton type="primary" onClick={() => push(`/full-page/${agent.id}/coverage`)}>
                <Icons.OpenLive />
                <span>Open live</span>
              </ToAgentButton>
              <Settings>
                <Icons.Settings onClick={() => push(`/agents/${agent.id}/settings`)} />
              </Settings>
            </HeaderActions>
          }
          itemsActions={
            <ItemsActions
              itemsCount={selectedPlugins.length}
              actions={getSelectedPLuginsActions(agent, selectedPlugins, setSelectedPlugins)}
            />
          }
        />
        <Content>
          <PageHeader
            title={<PluginsTableTitle>Plugins</PluginsTableTitle>}
            itemsCount={(agent.rawPluginsName || []).length}
            actions={
              <AddPluginButton
                type="secondary"
                onClick={() => setIsAddPluginOpen(!isAddPluginOpen)}
              >
                <Icons.Add />
                <span>Add plugin</span>
              </AddPluginButton>
            }
            borderColor="black"
          />
          {(agent.rawPluginsName || []).length > 0 ? (
            <AgentPluginsTable
              plugins={agent.rawPluginsName}
              selectedPlugins={selectedPlugins}
              handleSelectPlugin={setSelectedPlugins}
              agentId={agent.id || ''}
            />
          ) : (
            <NoPluginsStub />
          )}
        </Content>
        <AddPluginsModal isOpen={isAddPluginOpen} onToggle={setIsAddPluginOpen} agentId={agentId} />
      </div>
    );
  }),
);

const Content = agentInfoPage.content('div');
const HeaderTitle = agentInfoPage.headerTitle('div');
const ToggleAgent = agentInfoPage.toggleAgent('div');
const ToggleAgentHeader = agentInfoPage.toggleAgentHeader('div');
const HeaderActions = agentInfoPage.headerActions('div');
const ToAgentButton = agentInfoPage.toAgent(Button);
const Settings = agentInfoPage.settings('div');
const PluginsTableTitle = agentInfoPage.pluginsTableTitle('div');
const AddPluginButton = agentInfoPage.addPlugin(Button);

const toggleAgent = (agentId: string) => axios.post(`agents/${agentId}/toggle-standby`);
