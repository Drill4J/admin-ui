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
import { BEM } from '@redneckz/react-bem-helper';
import { ExpandableTable, Column } from '@drill4j/ui-kit';

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
          Cell={({ value }) => <div className="text-ellipsis" title={value}>{value}</div>}
          align="start"
        />,
        <Column name="agentType" label="Type" align="start" />,
        <Column
          name="environment"
          label="Environment"
          Cell={({ value, item }) => (
            <div className="text-ellipsis" title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</div>
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
      gridTemplateColumns="32px minmax(calc(100% - 862px), 300px) 250px 150px 120px 120px 190px"
      gridExpandedTemplateColumns="32px minmax(calc(100% - 862px), 300px) 250px 150px 120px 120px 190px"
    >
      <Column name="name" label="Name" Cell={({ item }) => <NameColumn agent={item} />} align="start" />
      <Column
        name="description"
        label="Description"
        Cell={({ value }) => <div className="text-ellipsis" title={value}>{value}</div>}
        align="start"
      />
      <Column name="agentType" label="Type" align="start" />
      <Column
        name="environment"
        label="Environment"
        Cell={({ value, item }) => (
          <div className="text-ellipsis" title={value}>{item.status === AGENT_STATUS.NOT_REGISTERED ? 'n/a' : value}</div>
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
