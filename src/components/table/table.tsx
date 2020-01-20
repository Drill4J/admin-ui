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
  secondLevelExpand?: any[];
  expandedContentKey?: string;
  withoutHeader?: boolean;
  selectedRows?: string[];
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
    secondLevelExpand,
    withoutHeader,
    selectedRows = [],
  }: Props) => {
    const columns = React.Children.map(children, (column) => column && column.props);
    const expandedColumnsComponents = React.Children.map(
      expandedColumns,
      (column) => column && column.props,
    );
    const expandedColumnsSecondLevel = React.Children.map(
      secondLevelExpand,
      (column) => column && column.props,
    );

    return (
      <table className={className}>
        {!withoutHeader && <TableHeader columns={columns} />}
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={idKey ? String(item[idKey]) : index}
              item={item}
              columns={columns}
              index={index}
              expandedColumns={expandedColumnsComponents}
              color={getRowColor({ expandedRows, selectedRows, itemId: String(item[idKey]) })}
              expandedContentKey={expandedContentKey}
              expandedRows={expandedRows}
              secondLevelExpand={expandedColumnsSecondLevel}
            />
          ))}
        </tbody>
        {footer}
      </table>
    );
  },
);

// eslint-disable-next-line consistent-return
function getRowColor({
  expandedRows,
  selectedRows,
  itemId,
}: {
  expandedRows: string[];
  selectedRows: string[];
  itemId: string;
}) {
  if (expandedRows.includes(itemId)) {
    return 'blue';
  }
  if (selectedRows.includes(itemId)) {
    return 'yellow';
  }
}
