import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText, ExpandableTable, Column } from '@drill4j/ui-kit';

import { toggleAgent } from 'api';
import { NotificationManagerContext } from 'notification-manager';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { NameColumn } from './name-column';
import { ActionsColumn } from './actions-column';
import { AgentStatusToggler } from '../agent-status-toggler';

import styles from './table-view.module.scss';

interface Props {
  className?: string;
  agents: Agent[];
}

const agentsTable = BEM(styles);

export const AgentsTable = agentsTable(({ className, agents }: Props) => {
  const { showMessage } = React.useContext(NotificationManagerContext);

  return (
    <div className={className}>
      <ExpandableTable
        data={agents}
        idKey="id"
        expandedColumns={[
          <Column name="expander" Cell={() => null} />,
          <Column
            name="name"
            label="Name"
            Cell={({ item }) => <NameColumn agent={item} withMargin />}
          />,
          <Column
            name="description"
            label="Description"
            Cell={({ value }) => <OverflowText>{value.substr(0, 150)}</OverflowText>}
          />,
          <Column name="agentType" label="Type" />,
          <Column
            name="environment"
            label="Environment"
            Cell={({ value, item }) => (
              <span>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</span>
            )}
          />,
          <Column
            name="status"
            label="Status"
            Cell={({ value, item }) => (
              <AgentStatusToggler
                status={value}
                onChange={() => toggleAgent(item.id, value, showMessage)}
              />
            )}
          />,
          <Column
            name="actions"
            Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
          />,
        ]}
        expandedContentKey="agents"
      >
        <Column name="name" label="Name" Cell={({ item }) => <NameColumn agent={item} />} />
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText>{value.substr(0, 150)}</OverflowText>}
        />
        <Column name="agentType" label="Type" />
        <Column
          name="environment"
          label="Environment"
          Cell={({ value, item }) => (
            <span>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</span>
          )}
        />
        <Column
          name="status"
          label="Status"
          Cell={({ value, item }) => {
            const isOfflineAgent = item.agentType === 'Java' && !item.agentVersion;
            return (item.agentType !== 'ServiceGroup' && !isOfflineAgent ? (
              <AgentStatusToggler status={value} onChange={() => toggleAgent(item.id, value, showMessage)} />
            ) : null);
          }}
        />
        <Column
          name="actions"
          Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
        />
      </ExpandableTable>
    </div>
  );
});
