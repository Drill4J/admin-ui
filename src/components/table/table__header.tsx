import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { SortArrows } from 'components';
import { DefaultHeaderCell } from './default-header-cell';
import { ColumnProps, CombinedColumnsProps } from './table-types';

import styles from './table.module.scss';

interface Columns {
  singleColumns: ColumnProps[];
  groupedColumns?: CombinedColumnsProps;
}

interface Props {
  className?: string;
  columns: Columns;
  currentOrder: 'asc' | 'desc';
  sortedFieldName: string;
  toggleSort: (fieldName: string) => void;
  setSortedField: (fieldName: string) => void;
}

export const TableHeader = BEM(styles).header(({
  columns, className, currentOrder, sortedFieldName, toggleSort, setSortedField,
}: Props) => {
  const { singleColumns, groupedColumns } = columns;
  return (
    <thead className={className}>
      <tr>
        {singleColumns.map((column) => {
          const HeaderCell = column.HeaderCell || DefaultHeaderCell;
          return (
            <th rowSpan={2} style={{ width: column.width, verticalAlign: 'top' }}>
              <Panel>
                <HeaderCell column={column} />
                {column.name !== 'selector' && column.name !== 'actions' && (
                  <SortArrows
                    sort={sortedFieldName === column.name ? currentOrder : undefined}
                    onClick={() => (sortedFieldName === column.name
                      ? toggleSort(column.name)
                      : setSortedField(column.name))}
                  />
                )}
              </Panel>
            </th>
          );
        })}
        {groupedColumns && <th colSpan={groupedColumns.columns.length}>{groupedColumns.name}</th>}
      </tr>
      {groupedColumns && (
        <tr>
          {groupedColumns.columns.map((column) => {
            const HeaderCell = column.HeaderCell || DefaultHeaderCell;
            return (
              <th key={column.props.name} style={{ width: column.props.width }}>
                <Panel>
                  {column.props.name !== 'actions' && (
                    <SortArrows
                      sort={sortedFieldName === column.props.name ? currentOrder : undefined}
                      onClick={() => (sortedFieldName === column.props.name
                        ? toggleSort(column.props.name)
                        : setSortedField(column.props.name))}
                    />
                  )}
                  <HeaderCell column={column.props} />
                </Panel>
              </th>
            );
          })}
        </tr>
      )}
    </thead>
  );
});
