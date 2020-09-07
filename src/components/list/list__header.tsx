import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';

import { ColumnProps } from './list-types';

import styles from './list.module.scss';

interface Props {
  className?: string;
  columns: ColumnProps[];
  style: { [key: string]: string };
}

export const ListHeader = BEM(styles).header(({ className, columns, style }: Props) => (
  <div className={className} style={style}>
    {columns.map((column, index) => {
      const DefaultHeaderCell = ({ column: { label } }: { column: ColumnProps }) => (
        <div>{label}</div>
      );
      const HeaderCell = column.HeaderCell || DefaultHeaderCell;
      return <HeaderCell column={column} key={nanoid()} />;
    })}
  </div>
));
