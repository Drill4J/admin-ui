import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { SortArrows } from 'components/sort-arrow';
import { Panel } from 'layouts';
import { useSorter } from 'hooks';
import { TableRow } from './table__row';
import { DefaultHeaderCell } from './default-header-cell';

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
    const [sortableColumnName, setSortableColumnName] = React.useState('name');
    const [order, setOrder] = React.useState<any>('asc');
    const sortData = useSorter(data, sortableColumnName, order);
    return (
      <table className={className}>
        {!withoutHeader && (
          <thead className={className}>
            <tr>
              {columns.map((column, index) => {
                const HeaderCell = column.HeaderCell || DefaultHeaderCell;
                return (
                  <th key={column.name} style={{ width: column.width }}>
                    <Panel>
                      <HeaderCell column={column} />
                      {index > 0 && (
                        <SortArrows
                          sort={column.name === sortableColumnName ? order : 'unsorted'}
                          onClick={() => { (order === 'asc' ? setOrder('desc') : setOrder('asc')); setSortableColumnName(column.name); }}
                        />
                      )}
                    </Panel>
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {sortData.map((item, index) => (
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
