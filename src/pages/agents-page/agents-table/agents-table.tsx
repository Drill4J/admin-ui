import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText, ExpandableTable, Column } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { NameColumn } from './name-column';
import { ActionsColumn } from './actions-column';
import { AgentStatusToggle } from '../agent-status-toggle';

import styles from './table-view.module.scss';

interface Props {
  className?: string;
  agents: Agent[];
}

const agentsTable = BEM(styles);

export const AgentsTable = agentsTable(({ className, agents }: Props) => (
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
          width="40%"
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
            <OverflowText title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</OverflowText>
          )}
        />,
        <Column
          name="status"
          label="Status"
          Cell={({ item }) => <AgentStatusToggle agent={item} />}
        />,
        <Column
          name="actions"
          Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
        />,
      ]}
      expandedContentKey="agents"
    >
      <Column name="name" label="Name" Cell={({ item }) => <NameColumn agent={item} />} width="40%" />
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
          <OverflowText title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</OverflowText>
        )}
      />
      <Column
        name="status"
        label="Status"
        Cell={({ item }) => {
          const isOfflineAgent = item.agentType === 'Java' && !item.agentVersion;
          return (item.agentType !== 'ServiceGroup' && !isOfflineAgent ? (
            <AgentStatusToggle agent={item} />
          ) : null);
        }}
      />
      <Column
        name="actions"
        Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
        width="200px"
      />
    </ExpandableTable>
  </div>
));
