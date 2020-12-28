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
          align="start"
        />,
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText>{value.substr(0, 150)}</OverflowText>}
          align="start"
        />,
        <Column name="agentType" label="Type" align="start" />,
        <Column
          name="environment"
          label="Environment"
          Cell={({ value, item }) => (
            <OverflowText title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</OverflowText>
          )}
          align="start"
        />,
        <Column
          name="status"
          label="Status"
          Cell={({ item }) => <AgentStatusToggle agent={item} />}
          align="start"
        />,
        <Column
          name="actions"
          Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
        />,
      ]}
      expandedContentKey="agents"
      gridTemplateColumns="32px calc(100% - 862px) 250px 150px 120px 120px 190px"
      gridExpandedTemplateColumns="32px calc(100% - 862px) 250px 150px 120px 120px 190px"
    >
      <Column name="name" label="Name" Cell={({ item }) => <NameColumn agent={item} />} align="start" />
      <Column
        name="description"
        label="Description"
        Cell={({ value }) => <OverflowText>{value.substr(0, 150)}</OverflowText>}
        align="start"
      />
      <Column name="agentType" label="Type" align="start" />
      <Column
        name="environment"
        label="Environment"
        Cell={({ value, item }) => (
          <OverflowText title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</OverflowText>
        )}
        align="start"
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
        align="start"
      />
      <Column
        name="actions"
        Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
      />
    </ExpandableTable>
  </div>
));
