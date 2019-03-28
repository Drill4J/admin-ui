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

const getPluginsLinks = (agentId: string) => [
  { link: 'coverage', icon: Icons.Coverage, computedLink: `full-page/${agentId}/coverage` },
];

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};

    return (
      <PluginsLayout
        sidebar={
          <Sidebar
            links={getPluginsLinks(agentId)}
            matchParams={{ path: '/full-page/:agentId/:activeLink' }}
            longLinks
          />
        }
        toolbar={
          <Toolbar>
            <Panel>
              <AgentStatus status={agent.status} />
              {agent.name} {agent.ipAddress}
            </Panel>
          </Toolbar>
        }
      >
        <div className={className}>
          <CoveragePlugin />
        </div>
      </PluginsLayout>
    );
  }),
);

const AgentStatus = agentFullPage.agentStatus(div({ status: false } as { status?: boolean }));
