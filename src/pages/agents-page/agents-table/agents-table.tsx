/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { Table, TR } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { NameColumn } from './name-column';
import { ActionsColumn } from './actions-column';
import { AgentStatusToggle } from '../agent-status-toggle';

interface Props {
  agents: Agent[];
}

export const AgentsTable = ({ agents }: Props) => {
  const columns = [
    {
      Header: () => null,
      id: 'expander',
      Cell: ({ row }: any) =>
        (row.original.agents ? (
          <span
            {...row.getToggleRowExpandedProps?.()}
            tw="grid place-items-center w-4 h-4 text-blue-default"
          >
            {row.isExpanded ? <Icons.Expander rotate={90} /> : <Icons.Expander />}
          </span>
        ) : null),
      width: '48px',
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: any) => <NameColumn agent={row.original} />,
      SubCell: ({ row }: any) => <NameColumn agent={row.original} withMargin />,
      textAlign: 'left',
      width: '40%',
    },
    {
      Header: 'Description',
      accessor: 'description',
      Cell: ({ value = '' }: any) => (
        <div className="text-ellipsis" title={value}>
          {value}
        </div>
      ),
      textAlign: 'left',
      width: '30%',
    },
    {
      Header: 'Type',
      accessor: 'agentType',
      textAlign: 'left',
      width: '15%',
    },
    {
      Header: 'Environment',
      accessor: 'environment',
      Cell: ({ value, row }: any) => (
        <div className="text-ellipsis" title={value}>
          {row.original.status === AGENT_STATUS.NOT_REGISTERED || !value ? 'n/a' : value}
        </div>
      ),
      textAlign: 'left',
      width: '15%',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }: any) => {
        const isOfflineAgent = row.original.agentType === 'Java' && !row.original.agentVersion;
        return row.original.agentType !== 'ServiceGroup' && !isOfflineAgent ? (
          <AgentStatusToggle agent={row.original} />
        ) : null;
      },
      textAlign: 'left',
      width: '15%',
    },
    {
      Header: () => null,
      accessor: 'actions',
      Cell: ({ row }: any) => <ActionsColumn agent={row.original} />,
      width: '20%',
    },
  ];
  return (
    <div tw="w-full h-full">
      <Table
        withSearchPanel={false}
        isDefaulToggleSortBy
        columns={columns}
        data={agents}
        renderRowSubComponent={({ row, rowProps }: any) => (
          <>
            {row.original.agents.map((x: any, i: any) => (
              <TR
                {...rowProps}
                tw="border-l border-r border-monochrome-medium-tint"
                key={x.id}
              >
                {row.cells.map((cell: any) => (
                  <td {...cell.getCellProps()} tw="first:px-4 last:px-4">
                    {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                      value: cell.column.accessor && cell.column.accessor(x, i),
                      row: { ...row, original: x },
                    })}
                  </td>
                ))}
              </TR>
            ))}
          </>
        )}
      />
    </div>
  );
};
