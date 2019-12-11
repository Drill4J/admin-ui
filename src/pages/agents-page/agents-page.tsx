import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from 'components';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { TableView } from './table-view';
import { NoAgentsStub } from './no-agents-stub';
import { Agent } from 'types/agent';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => {
  const agents = useWsConnection<Agent[]>(defaultAdminSocket, '/get-all-agents') || [];
  const [selectedAgents, setSelectedAgents] = React.useState<string[]>([]);

  return (
    <div className={className}>
      <PageHeader title="Agents" itemsCount={agents.length} />
      <Content>
        {agents.length > 0 ? (
          <TableView
            agents={agents}
            selectedAgents={selectedAgents}
            handleSelectAgents={setSelectedAgents}
          />
        ) : (
          <NoAgentsStub />
        )}
      </Content>
    </div>
  );
});

const Content = agentsPage.content('div');
