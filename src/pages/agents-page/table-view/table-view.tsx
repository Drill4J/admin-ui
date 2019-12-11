import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { SelectableTable, Column, OverflowText } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { NameColumn } from './name-column';
import { ActionsColumn } from './actions-column';
import { Agent } from 'types/agent';

import styles from './table-view.module.scss';
import { AgentStatusToggler } from '../agent-status-toggler';

interface Props {
  className?: string;
  agents: Agent[];
  handleSelectAgents: (selectedId: string[]) => any;
  selectedAgents: string[];
}

const tableView = BEM(styles);

export const TableView = tableView(
  ({ className, handleSelectAgents, agents, selectedAgents }: Props) => (
    <div className={className}>
      <SelectableTable
        data={agents}
        idKey="id"
        selectedRows={selectedAgents}
        onSelect={handleSelectAgents}
        checkboxDescriptor={({ status }: Agent) => status !== AGENT_STATUS.NOT_REGISTERED}
      >
        <Column
          name="name"
          label="Name"
          Cell={({ value, item: { id, status, buildVersion } }) => (
            <NameColumn
              agentId={id}
              buildVersion={buildVersion}
              agentName={value}
              unregistered={status === AGENT_STATUS.NOT_REGISTERED}
            />
          )}
        />
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText>{value.substr(0, 150) || 'n/a'}</OverflowText>}
        />
        <Column name="ipAddress" label="IP Address" />
        <Column
          name="group"
          label="Group"
          Cell={({ value, item }) => (
            <span>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</span>
          )}
        />
        <Column
          name="status"
          label="Status"
          Cell={({ value, item }) => (
            <AgentStatusToggler status={value} onChange={() => toggleStandby(item.id)} />
          )}
        />
        <Column
          name="pluginsCount"
          HeaderCell={() => (
            <span>
              Plugins <br /> on / total
            </span>
          )}
          Cell={({ item: { activePluginsCount, plugins = [] } }: { item: Agent }) => {
            return activePluginsCount ? (
              <span>{`${activePluginsCount}/${plugins.length}`}</span>
            ) : (
              <span>n/a</span>
            );
          }}
        />
        <Column
          name="actions"
          label="Actions"
          Cell={({ item }: { item: Agent }) => <ActionsColumn agent={item} />}
        />
      </SelectableTable>
    </div>
  ),
);

const toggleStandby = (agentId: string) => {
  axios.post(`/agents/${agentId}/toggle-standby`);
};
