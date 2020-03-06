import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { SortArrows } from 'components/sort-arrow';
import { Panel } from 'layouts';
import { DefaultHeaderCell } from './default-header-cell';
import { Sort } from './table-types';

import styles from './table.module.scss';

interface Props {
  className?: string;
  columns: any[];
  sort?: Sort;
  onSort?: (sortField: string) => void;
}

export const TableHeader = BEM(styles).header(({ columns, className }: Props) => {
  const [order, setOrder] = React.useState<any>('unsorted');
  return (
    <thead className={className}>
      <tr>
        {columns.map((column) => {
          const HeaderCell = column.HeaderCell || DefaultHeaderCell;
          return (
            <th key={column.name} style={{ width: column.width }}>
              <Panel>
                <HeaderCell column={column} />
                <SortArrows
                  sort={order}
                  onClick={() => { (order === 'asc' ? setOrder('desc') : setOrder('asc')); }}
                />
              </Panel>
            </th>
          );
        })}
      </tr>
    </thead>
  );
});
