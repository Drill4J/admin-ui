import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons, Sidebar, Toolbar, Badge, Divider } from '../../components';
import { AppLayout, Panel } from '../../layouts';
import { Agent } from '../../types/agent';
import { CoveragePlugin } from './coverage-plugin';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';
import { AGENT_STATUS } from '../../common/constants';

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
  agentFullPage(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};

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
                <ArrowBackIcon rotate={180} onClick={() => push('/')} />
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
          <CoveragePlugin agent={agent} />
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
