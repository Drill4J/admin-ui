import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, ItemsActions } from '../../components';
import { WsConnection } from '../../common/connection';
import { Agent } from './agent-types';
import { LayoutSwitch } from './layout-switch';
import { TableView } from './table-view';
import { CardView } from './card-view';
import { NoAgentsStub } from './no-agents-stub';
import { getSelectedAgentsActions } from './get-selected-agents-actions';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => {
  const [isTableView, setIsTableView] = React.useState(true);
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [selectedAgents, setSelectedAgents] = React.useState<string[]>([]);

  React.useEffect(() => {
    const connection = new WsConnection().onOpen(() => {
      connection.subscribe('/get-all-agents', setAgents);
    });

    return () => {
      connection.unsubscribe('/get-all-agents');
    };
  }, []);

  return (
    <div className={className}>
      <PageHeader
        title="Agents"
        itemsCount={agents.length}
        actions={
          <LayoutSwitch
            isLeftActive={isTableView}
            onLeftClick={() => setIsTableView(true)}
            onRightClick={() => setIsTableView(false)}
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
            <CardView agents={agents} />
          )
        ) : (
          <NoAgentsStub />
        )}
      </Content>
    </div>
  );
});

const Content = agentsPage.content('div');
