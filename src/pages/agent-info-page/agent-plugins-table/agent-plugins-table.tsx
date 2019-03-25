import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { SelectableTable, Column, Toggler, Badge } from '../../../components';

import styles from './agent-plugins-table.module.scss';

interface Plugin {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface Props {
  className?: string;
  plugins: Plugin[];
  selectedPlugins: string[];
  handleSelectPlugin: (selectedId: string[]) => any;
  agentId: string;
}

const agentPluginsTable = BEM(styles);

export const AgentPluginsTable = agentPluginsTable(
  ({ className, plugins = [], selectedPlugins, handleSelectPlugin, agentId }: Props) => (
    <div className={className}>
      <SelectableTable
        idKey="id"
        data={plugins}
        selectedRows={selectedPlugins}
        onSelect={handleSelectPlugin}
        wideColumns
      >
        <Column
          name="status"
          Cell={({ value, item }) => (
            <StatusColumn>
              <Toggler value={value} onChange={() => togglePlugin(agentId, item.id)} />
            </StatusColumn>
          )}
        />
        <Column name="name" label="Plugin" />
        <Column name="description" label="Description" />
        <Column name="type" label="Type" Cell={({ value }) => <Badge text={value} />} />
      </SelectableTable>
    </div>
  ),
);

const StatusColumn = agentPluginsTable.statusColumn('div');

const togglePlugin = (agentId: string, pluginId: string) => {
  axios.post(`/agents/${agentId}/${pluginId}/toggle-plugin`);
};
