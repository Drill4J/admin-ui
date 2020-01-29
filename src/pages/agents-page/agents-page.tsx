import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

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
  const { single = [], grouped = [] } = useWsConnection<{ single: Agent[]; grouped: ServiceGroup[] }>(
    defaultAdminSocket,
    '/get-all-agents',
  ) || {};
  const agents = [
    ...grouped
      .map(({ group, agents: groupedAgents }: ServiceGroup) => ({
        ...group,
        agents: groupedAgents,
        agentType: 'ServiceGroup',
      }))
      .flat(),
    ...single,
  ];
  const agentsCount = grouped.reduce(
    (sum, { agents: groupedAgents = [] }) => sum + groupedAgents.length,
    single.length,
  );

  return (
    <div className={className}>
      <PageHeader title="Agents" itemsCount={agentsCount} />
      <Content>{agentsCount > 0 ? <AgentsTable agents={agents} /> : <NoAgentsStub />}</Content>
    </div>
  );
});

const Content = agentsPage.content('div');
