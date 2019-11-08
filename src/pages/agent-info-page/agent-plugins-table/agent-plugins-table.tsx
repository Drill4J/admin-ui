import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SelectableTable, Column, Badge, Icons } from '../../../components';
import { Inputs } from '../../../forms';
import { Plugin } from '../../../types/plugin';

import styles from './agent-plugins-table.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  plugins?: Plugin[];
  selectedPlugins: string[];
  handleSelectPlugin: (selectedId: string[]) => any;
  agentId: string;
  buildVersion: string;
}

const agentPluginsTable = BEM(styles);

export const AgentPluginsTable = withRouter(
  agentPluginsTable(
    ({
      className,
      plugins = [],
      selectedPlugins,
      handleSelectPlugin,
      agentId,
      buildVersion,
      history: { push },
    }: Props) => (
      <div className={className}>
        <SelectableTable
          idKey="id"
          data={plugins}
          selectedRows={selectedPlugins}
          onSelect={handleSelectPlugin}
          columnsSize="wide"
        >
          <Column
            name="name"
            label="Plugin"
            Cell={({ value }) => (
              <NameColumn
                onClick={() =>
                  push(`/full-page/${agentId}/${buildVersion}/test-to-code-mapping/dashboard`)
                }
              >
                {value}
              </NameColumn>
            )}
          />
          <Column name="description" label="Description" />
          <Column name="type" label="Type" Cell={({ value }) => <Badge text={value} />} />
          <Column
            name="status"
            label="Status"
            Cell={({ value }) => (
              <StatusColumn>
                <Inputs.Toggler value={value} disabled />
              </StatusColumn>
            )}
          />
          <Column
            name="actions"
            label="Actions"
            Cell={({ item }) => {
              return (
                <ActionsColumn>
                  <Icons.Settings
                    height={18}
                    width={18}
                    onClick={() => push(`/agents/${agentId}/${item.id}/settings`)}
                  />
                </ActionsColumn>
              );
            }}
          />
        </SelectableTable>
      </div>
    ),
  ),
);

const NameColumn = agentPluginsTable.nameColumn('div');
const StatusColumn = agentPluginsTable.statusColumn('div');
const ActionsColumn = agentPluginsTable.actionsColumn('div');
