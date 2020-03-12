import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useSorter } from 'hooks';
import { TableRow } from './table__row';
import { TableHeader } from './table__header';
import { CombinedColumnsProps } from './table-types';

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
  defaultSortField?: string;
  combinedColumn?: CombinedColumnsProps;
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
    defaultSortField = '',
    combinedColumn,
  }: Props) => {
    const combinedColumnComponents = React.Children.map(
      combinedColumn?.columns,
      (column) => column && column.props,
    );
    const columns = React.Children.map(children, (column) => column && column.props);
    const expandedColumnsComponents = React.Children.map(
      expandedColumns,
      (column) => column && column.props,
    );
    const expandedColumnsSecondLevel = React.Children.map(
      secondLevelExpand,
      (column) => column && column.props,
    );
    const {
      sortedData = [], order, toggleOrder, fieldName, setSortedField,
    } = useSorter(data as { [key: string]: string | number }[], defaultSortField);

    return (
      <table className={className}>
        {!withoutHeader && (
          <TableHeader
            columns={{
              singleColumns: columns,
              groupedColumns: combinedColumn,
            }}
            currentOrder={order}
            sortedFieldName={fieldName}
            toggleSort={toggleOrder}
            setSortedField={setSortedField}
          />
        )}
        <tbody>
          {sortedData.map((item: {[key: string]: unknown}, index: number) => (
            <TableRow
              key={idKey ? String(item[idKey]) : index}
              item={item}
              columns={columns.concat(combinedColumnComponents || [])}
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
