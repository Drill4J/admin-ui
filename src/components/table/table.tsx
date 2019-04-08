import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { TableRow } from './table__row';
import { TableHeader } from './table__header';

import styles from './table.module.scss';

interface Props {
  className?: string;
  data?: Array<{ [key: string]: unknown }>;
  children: any;
  idKey?: string;
  footer?: React.ReactNode;
  sort?: object;
  onSort?: (sortField: string) => void;
  columnsSize?: 'wide' | 'medium';
  expandedRows?: string[];
  expandedColumns?: any[];
  expandedContentKey?: string;
}

const table = BEM(styles);

export const Table = table(
  ({
    className,
    data = [],
    children,
    idKey = '',
    footer,
    expandedRows = [],
    expandedColumns,
    expandedContentKey,
  }: Props) => {
    const columns = React.Children.map(children, (column) => column && column.props);
    const expandedColumnsComponents = React.Children.map(
      expandedColumns,
      (column) => column && column.props,
    );

    return (
      <table className={className}>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={idKey ? String(item[idKey]) : index}
              item={item}
              columns={columns}
              index={index}
              expandedColumns={expandedColumnsComponents}
              expanded={expandedRows.includes(String(item[idKey]))}
              expandedContentKey={expandedContentKey}
            />
          ))}
        </tbody>
        {footer}
      </table>
    );
  },
);
