import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WsConnection } from '../../common/connection';
import { Icons, Sidebar, Toolbar } from '../../components';
import { PluginsLayout } from '../../layouts';
import { Agent } from '../../types/agent';
import { CoveragePlugin } from './coverage-plugin';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

const pluginsLinks = [{ link: 'coverage', icon: Icons.Coverage }];

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};

    return (
      <PluginsLayout
        sidebar={<Sidebar links={pluginsLinks} />}
        toolbar={
          <Toolbar>
            <AgentStatus status={agent.status} />
            {agent.name} {agent.ipAddress}
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
