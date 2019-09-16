import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { DefaultHeaderCell } from './default-header-cell';
import { Sort } from './table-types';

import styles from './table.module.scss';

interface Props {
  className?: string;
  columns: any[];
  sort?: Sort;
  onSort?: (sortField: string) => void;
}

export const TableHeader = BEM(styles).header(({ columns, className }: Props) => (
  <thead className={className}>
    <tr>
      {columns.map((column) => {
        const HeaderCell = column.HeaderCell || DefaultHeaderCell;
        return (
          <th key={column.name} style={{ width: column.width }}>
            <HeaderCell column={column} />
          </th>
        );
      })}
    </tr>
  </thead>
));
