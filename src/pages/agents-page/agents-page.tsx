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
  const agentsList = useWsConnection<Agent[]>(
    defaultAdminSocket,
    '/api/agents',
  ) || [];
  const serviceGroups = useWsConnection<ServiceGroup[]>(defaultAdminSocket, '/api/groups') || [];
  const agents = [
    ...serviceGroups.map((serviceGroup) => ({
      ...serviceGroup,
      agentType: 'ServiceGroup',
      agents: agentsList.filter((agent) => agent.serviceGroup === serviceGroup.id),
    })),
    ...agentsList.filter(({ serviceGroup }) => !serviceGroup),
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
