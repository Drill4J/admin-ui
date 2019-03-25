import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { SelectableTable, Column, Toggler, OverflowText, Icons } from '../../../components';
import { Agent } from '../agent-types';
import { NameColumn } from './name-column';

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
        idKey="ipAddress"
        selectedRows={selectedAgents}
        onSelect={handleSelectAgents}
      >
        <Column
          name="name"
          label="Name"
          Cell={({ value, item: { ipAddress } }) => (
            <NameColumn agentId={ipAddress} agentName={value} />
          )}
        />
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText style={{ width: '100%' }}>{value}</OverflowText>}
        />
        <Column name="ipAddress" label="IP Address" />
        <Column name="group" label="Group" />
        <Column
          name="status"
          label="Drill4J"
          Cell={({ value, item }) => (
            <StatusColumn>
              <Toggler
                value={value}
                label={value ? 'On' : 'Off'}
                onChange={() => toggleStandby(item.ipAddress)}
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
          Cell={({ item }: { item: Agent }) => {
            return (
              <ActionsColumn>
                <Icons.NewWindow />
                <Icons.Settings height={16} width={16} />
              </ActionsColumn>
            );
          }}
        />
      </SelectableTable>
    </div>
  ),
);

const StatusColumn = tableView.statusColumn('div');
const ActionsColumn = tableView.actionsColumn('div');

const toggleStandby = (agentId: string) => {
  axios.post(`/agents/${agentId}/toggle-standby`);
};
