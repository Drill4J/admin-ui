import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { PageHeader, Icons, ItemsActions } from '../../components';
import { Button, Inputs } from '../../forms';
import { useAgent } from '../../hooks';
import { AGENT_STATUS } from '../../common/constants';
import { AgentPluginsTable } from './agent-plugins-table';
import { AddPluginsModal } from './add-plugins-modal';
import { NoPluginsStub } from './no-plugins-stub';

import styles from './agent-info-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentInfoPage = BEM(styles);

export const AgentInfoPage = withRouter(
  agentInfoPage(({ className, history: { push }, match: { params: { agentId } } }: Props) => {
    const agent = useAgent(agentId, () => push('/not-found')) || {};
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
                  value={agent.status === AGENT_STATUS.ONLINE}
                  label={
                    <ToggleAgentHeader>{`Drill4J ${
                      agent.status === AGENT_STATUS.ONLINE ? 'on' : 'off'
                    }`}</ToggleAgentHeader>
                  }
                  onChange={() => toggleAgent(agent.id || '')}
                />
              </ToggleAgent>
            </HeaderTitle>
          }
          actions={
            <HeaderActions>
              <ToAgentButton
                type="primary"
                onClick={() => push(`/full-page/${agent.id}/coverage/dashboard`)}
              >
                <Icons.OpenLive />
                <span>Dashboard</span>
              </ToAgentButton>
              <Settings>
                <Icons.Settings onClick={() => push(`/agents/${agent.id}/settings`)} />
              </Settings>
            </HeaderActions>
          }
          itemsActions={
            <ItemsActions
              itemsCount={selectedPlugins.length}
              // TODO: uncomment after backend implementation
              // actions={getSelectedPLuginsActions(agent, selectedPlugins, setSelectedPlugins)}
              actions={[]}
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
