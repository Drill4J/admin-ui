import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WsConnection } from '../../common/connection';
import { Icons, Sidebar, Toolbar } from '../../components';
import { PluginsLayout } from '../../layouts';
import { Agent } from '../../types/agent';
import { CoveragePlugin } from './coverage-plugin';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

const pluginsLinks = [{ link: 'coverage', icon: Icons.Coverage }];

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } } }: Props) => {
    const [agent, setAgent] = React.useState<Agent>({});

    React.useEffect(() => {
      const connection = new WsConnection().onOpen(() => {
        connection.subscribe(`/get-agent/${agentId}`, setAgent);
      });

      return () => {
        connection.unsubscribe(`/get-agent/${agentId}`);
      };
    }, []);

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
