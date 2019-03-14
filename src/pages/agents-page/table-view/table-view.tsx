import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { SelectableTable, Column, Toggler, OverflowText } from '../../../components';
import { Agent } from '../agent-types';

import styles from './table-view.module.scss';

interface Props {
  className?: string;
  agents: Agent[];
}

const tableView = BEM(styles);

export const TableView = tableView(({ className, agents }: Props) => (
  <div className={className}>
    <SelectableTable data={agents}>
      <Column name="name" label="Name" Cell={({ value }) => <NameColumn>{value}</NameColumn>} />
      <Column
        name="description"
        label="Description"
        Cell={({ value }) => <OverflowText style={{ width: '382px' }}>{value}</OverflowText>}
      />
      <Column name="ipAddress" label="IP Address" />
      <Column name="group" label="Group" />
      <Column name="status" label="Drill4J" Cell={Toggler} />
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
    </SelectableTable>
  </div>
));

const NameColumn = tableView.nameColumn('span');
