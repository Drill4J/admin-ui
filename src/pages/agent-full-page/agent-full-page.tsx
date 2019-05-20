import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons, Sidebar, Toolbar } from '../../components';
import { PluginsLayout, Panel } from '../../layouts';
import { Agent } from '../../types/agent';
import { CoveragePlugin } from './coverage-plugin';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

const getPluginsLinks = (agent: Agent) => [
  { link: 'coverage', icon: Icons.Coverage, computedLink: `full-page/${agent.id}/coverage` },
];

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};

    return (
      <PluginsLayout
        sidebar={
          <Sidebar
            links={getPluginsLinks(agent)}
            matchParams={{ path: '/full-page/:agentId/:activeLink' }}
          />
        }
        toolbar={
          <Toolbar>
            <Panel>
              <AgentStatus status={agent.status} />
              <AgentName>{agent.name}</AgentName>
              <AgentIpAddress>{agent.ipAddress}</AgentIpAddress>
            </Panel>
          </Toolbar>
        }
      >
        <div className={className}>
          <CoveragePlugin agentBuildVersion={agent.buildVersion} />
        </div>
      </PluginsLayout>
    );
  }),
);

const AgentStatus = agentFullPage.agentStatus(div({ status: false } as { status?: boolean }));
const AgentName = agentFullPage.agentName('div');
const AgentIpAddress = agentFullPage.agentIpAddress('div');
