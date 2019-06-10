import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { SelectableTable, Column, OverflowText } from '../../../components';
import { Inputs } from '../../../forms';
import { AGENT_STATUS } from '../../../common/constants';
import { NameColumn } from './name-column';
import { ActionsColumn } from './actions-column';
import { Agent } from '../../../types/agent';

import styles from './table-view.module.scss';

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
      >
        <Column
          name="name"
          label="Name"
          Cell={({ value, item: { id, status } }) => (
            <NameColumn
              agentId={id}
              agentName={value}
              unregistered={status === AGENT_STATUS.NOT_REGISTERED}
            />
          )}
        />
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText>{value}</OverflowText>}
        />
        <Column name="ipAddress" label="IP Address" />
        <Column name="group" label="Group" />
        <Column
          name="status"
          label="Drill4J"
          Cell={({ value, item }) => (
            <StatusColumn>
              <Inputs.Toggler
                value={value === AGENT_STATUS.READY}
                label={value === AGENT_STATUS.READY ? 'On' : 'Off'}
                onChange={() => toggleStandby(item.id)}
              />
            </StatusColumn>
          )}
        />
        <Column
          name="pluginsCount"
          HeaderCell={() => (
            <span>
              Plugins <br /> on / total
            </span>
          )}
          Cell={({ item }: { item: Agent }) => {
            return <span>{`${item.activePluginsCount}/${item.pluginsCount}`}</span>;
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

const StatusColumn = tableView.statusColumn('div');

const toggleStandby = (agentId: string) => {
  axios.post(`/agents/${agentId}/toggle-standby`);
};
