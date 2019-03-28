import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, ItemsActions } from '../../components';
import { Agent } from '../../types/agent';
import { LayoutSwitch } from './layout-switch';
import { TableView } from './table-view';
import { CardView } from './card-view';
import { NoAgentsStub } from './no-agents-stub';
import { getSelectedAgentsActions } from './get-selected-agents-actions';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => {
  const [isTableView, setIsTableView] = React.useState(true);
  const agents = useWsConnection<Agent[]>(defaultAdminSocket, '/get-all-agents') || [];
  const [selectedAgents, setSelectedAgents] = React.useState<string[]>([]);

  return (
    <div className={className}>
      <PageHeader
        title="Agents"
        itemsCount={agents.length}
        actions={
          <LayoutSwitch
            isLeftActive={!isTableView}
            onLeftClick={() => setIsTableView(false)}
            onRightClick={() => setIsTableView(true)}
          />
        }
        itemsActions={
          <ItemsActions
            itemsCount={selectedAgents.length}
            actions={getSelectedAgentsActions(agents, selectedAgents, setSelectedAgents)}
          />
        }
      />
      <Content>
        {agents.length > 0 ? (
          isTableView ? (
            <TableView
              agents={agents}
              selectedAgents={selectedAgents}
              handleSelectAgents={setSelectedAgents}
            />
          ) : (
            <CardView
              idKey="ipAddress"
              agents={agents}
              selectedAgents={selectedAgents}
              handleSelectAgents={setSelectedAgents}
            />
          )
        ) : (
          <NoAgentsStub />
        )}
      </Content>
    </div>
  );
});

const Content = agentsPage.content('div');
