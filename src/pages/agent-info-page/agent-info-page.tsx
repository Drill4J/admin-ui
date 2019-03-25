import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { WsConnection } from '../../common/connection';
import { PageHeader, Button, Icons, Toggler, ItemsActions, Modal } from '../../components';
import { AgentPluginsTable } from './agent-plugins-table';
import { Agent } from '../agents-page/agent-types';
import { getSelectedPLuginsActions } from './get-selected-plugins-actions';
import { AddPluginsModal } from './add-plugins-modal';

import styles from './agent-info-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentInfoPage = BEM(styles);

export const AgentInfoPage = withRouter(
  agentInfoPage(({ className, match: { params: { agentId } } }: Props) => {
    const [agent, setAgent] = React.useState<Agent>({});
    const [selectedPlugins, setSelectedPlugins] = React.useState<string[]>([]);
    const [isAddPluginOpen, setIsAddPluginOpen] = React.useState(false);

    React.useEffect(() => {
      const connection = new WsConnection().onOpen(() => {
        connection.subscribe(`/get-agent/${agentId}`, setAgent);
      });

      return () => {
        connection.unsubscribe(`/get-agent/${agentId}`);
      };
    }, []);

    return (
      <div className={className}>
        <PageHeader
          title={
            <HeaderTitle>
              <Icons.Agents height={18} width={20} />
              <span>{agentId}</span>
              <ToggleAgent>
                <Toggler
                  value={agent.status}
                  label={`Drill4J ${agent.status ? 'on' : 'off'}`}
                  onChange={() => toggleAgent(agent.ipAddress || '')}
                />
              </ToggleAgent>
            </HeaderTitle>
          }
          actions={
            <HeaderActions>
              <ToAgentButton type="primary">
                <Icons.NewWindow />
                <span>Go to agent</span>
              </ToAgentButton>
              <Settings>
                <Icons.Settings />
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
            itemsCount={((agent as any).rawPluginsName || []).length}
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
          <AgentPluginsTable
            plugins={(agent as any).rawPluginsName}
            selectedPlugins={selectedPlugins}
            handleSelectPlugin={setSelectedPlugins}
            agentId={agent.ipAddress || ''}
          />
        </Content>
        <AddPluginsModal isOpen={isAddPluginOpen} onToggle={setIsAddPluginOpen} agentId={agentId} />
      </div>
    );
  }),
);

const Content = agentInfoPage.content('div');
const HeaderTitle = agentInfoPage.headerTitle('div');
const ToggleAgent = agentInfoPage.toggleAgent('div');
const HeaderActions = agentInfoPage.headerActions('div');
const ToAgentButton = agentInfoPage.toAgent(Button);
const Settings = agentInfoPage.settings('div');
const PluginsTableTitle = agentInfoPage.pluginsTableTitle('div');
const AddPluginButton = agentInfoPage.addPlugin(Button);

const toggleAgent = (agentId: string) => axios.post(`agents/${agentId}/toggle-standby`);
