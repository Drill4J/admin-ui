import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons, Sidebar, Toolbar, Badge, Divider } from '../../components';
import { AppLayout, Panel } from '../../layouts';
import { Agent } from '../../types/agent';
import { CoveragePlugin } from './coverage-plugin';
import { useAgent } from '../../hooks';
import { AGENT_STATUS } from '../../common/constants';
import { PluginProvider } from './coverage-plugin/store';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

const getPluginsLinks = (agent: Agent) => [
  {
    link: 'coverage',
    icon: Icons.Coverage,
    computedLink: `full-page/${agent.id}/coverage/dashboard`,
  },
];

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } }, history }: Props) => {
    const agent = useAgent(agentId, () => history.push('/not-found')) || {};

    return (
      <AppLayout
        sidebar={
          <Sidebar
            links={getPluginsLinks(agent)}
            matchParams={{ path: '/full-page/:agentId/:activeLink' }}
          />
        }
        toolbar={
          <Toolbar
            breadcrumbs={
              <Panel>
                <ArrowBackIcon rotate={180} onClick={() => history.goBack()} />
                <Divider />
                <AgentName>{agent.name}</AgentName>
                <AgentIpAddress>{agent.ipAddress}</AgentIpAddress>
                <AgentStatus
                  status={agent.status === AGENT_STATUS.READY ? 'online' : 'offline'}
                  text={agent.status === AGENT_STATUS.READY ? 'Online' : 'Offline'}
                  bold
                />
              </Panel>
            }
          >
            <Panel />
          </Toolbar>
        }
      >
        <div className={className}>
          <PluginProvider>
            <CoveragePlugin agent={agent} />
          </PluginProvider>
        </div>
      </AppLayout>
    );
  }),
);

const ArrowBackIcon = agentFullPage.arrowBackIcon(Icons.Arrow);
const AgentStatus: React.ComponentType<{
  text?: string;
  status?: 'online' | 'offline';
  bold?: boolean;
}> = agentFullPage.agentStatus(Badge);
const AgentName = agentFullPage.agentName('div');
const AgentIpAddress = agentFullPage.agentIpAddress('div');
