import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { SelectableTable, Column, Badge, Icons } from '../../../components';
import { Inputs } from '../../../forms';
import { Plugin } from '../../../types/plugin';

import styles from './agent-plugins-table.module.scss';

interface Props {
  className?: string;
  plugins?: Plugin[];
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
        columnsSize="wide"
      >
        <Column
          name="status"
          Cell={({ value, item }) => (
            <StatusColumn>
              <Inputs.Toggler value={value} onChange={() => togglePlugin(agentId, item.id)} />
            </StatusColumn>
          )}
        />
        <Column name="name" label="Plugin" />
        <Column name="description" label="Description" />
        <Column name="type" label="Type" Cell={({ value }) => <Badge text={value} />} />
        <Column
          name="actions"
          label="Actions"
          Cell={({ item }) => {
            return (
              <ActionsColumn>
                <Icons.Delete onClick={() => unloadPlugin(agentId, item.id)} />
              </ActionsColumn>
            );
          }}
        />
      </SelectableTable>
    </div>
  ),
);

const StatusColumn = agentPluginsTable.statusColumn('div');
const ActionsColumn = agentPluginsTable.actionsColumn('div');

const togglePlugin = (agentId: string, pluginId: string) => {
  axios.post(`/agents/${agentId}/${pluginId}/toggle-plugin`);
};

const unloadPlugin = (agentId: string, pluginId: string) => {
  axios.post(`/agents/${agentId}/unload-plugin`, { pluginId });
};
