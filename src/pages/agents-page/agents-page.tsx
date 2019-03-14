import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from '../../components';
import { WsConnection } from '../../common/connection';
import { Agent } from './agent-types';
import { LayoutSwitch } from './layout-switch';
import { TableView } from './table-view';
import { CardView } from './card-view';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => {
  const [agents, setAgents] = React.useState<Agent[]>([]);

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
      <PageHeader title="Agents" itemsCount={agents.length} />
      <LayoutSwitch />
      <Content>
        {/* <TableView agents={agents} /> */}
        <CardView agents={agents} />
      </Content>
    </div>
  );
});

const Content = agentsPage.content('div');
