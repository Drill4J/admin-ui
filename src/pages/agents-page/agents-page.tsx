import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Icons } from '@drill4j/ui-kit';
import { useHistory } from 'react-router-dom';

import { PageHeader } from 'components';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Agent } from 'types/agent';
import { ServiceGroup } from 'types/service-group';
import { AgentsTable } from './agents-table';
import { NoAgentsStub } from './no-agents-stub';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => {
  const { push } = useHistory();
  const { single = [], grouped = [] } = useWsConnection<{ single: Agent[]; grouped: ServiceGroup[] }>(
    defaultAdminSocket,
    '/agents',
  ) || {};
  const agentsList = useWsConnection<Agent[]>(
    defaultAdminSocket,
    '/api/agents',
  ) || [];
  const agents = [
    ...grouped
      .map(({ group, agents: groupedAgents }: ServiceGroup) => ({
        ...group,
        agents: groupedAgents,
        agentType: 'ServiceGroup',
      }))
      .flat(),
    ...single,
    ...agentsList.filter((agent) => !agent.agentVersion && agent.agentType === 'Java'),
  ];

  return (
    <div className={className}>
      <PageHeader
        title="Agents"
        itemsCount={agentsList.length}
        actions={(
          <Button type="secondary" size="large" onClick={() => push('/preregister/offline-agent')}>
            <Icons.Register />
            <span>Preregister Offline Agent</span>
          </Button>
        )}
      />
      <Content>{agentsList.length > 0 ? <AgentsTable agents={agents} /> : <NoAgentsStub />}</Content>
    </div>
  );
});

const Content = agentsPage.content('div');
