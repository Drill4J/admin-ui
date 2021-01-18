import { Children, ReactElement, ReactNode } from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { TableRow } from './table__row';
import { TableHeader } from './table__header';
import { ColumnProps } from './table-types';

import styles from './table.module.scss';

interface Props<T> {
  className?: string;
  data?: T[];
  children: ReactElement<ColumnProps<unknown, T>> | ReactElement<ColumnProps<unknown, T>>[];
  idKey?: string;
  footer?: ReactNode;
  expandedRows?: string[];
  expandedColumns?: ReactElement<ColumnProps<unknown, T>>[];
  secondLevelExpand?: ReactElement<ColumnProps<unknown, T>>[];
  expandedContentKey?: string;
  withoutHeader?: boolean;
  selectedRows?: string[];
  classesTopicPrefix: string;
  tableContentStub?: ReactNode | null;
}

const table = BEM(styles);

export const Table = table(
  <T, >({
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
    classesTopicPrefix,
    tableContentStub = null,
  }: Props<T>) => {
    const columns = Children.map(children, (column) => column && column.props);

    const expandedColumnsComponents = Children.map(
      expandedColumns,
      (column) => column && column.props,
    );
    const expandedColumnsSecondLevel = Children.map(
      secondLevelExpand,
      (column) => column && column.props,
    );

    return (
      <>
        <div className={className}>
          {!withoutHeader && <TableHeader columns={columns} expandedColumnsLength={expandedColumns?.length} />}
          {data.length > 0 && (
            data.map((item, index) => (
              <TableRow
                key={idKey ? String(get(item, idKey)) : index}
                item={item}
                columns={columns}
                index={index}
                expandedColumns={expandedColumnsComponents}
                color={getRowColor({ expandedRows, selectedRows, itemId: String(get(item, idKey)) })}
                expandedContentKey={expandedContentKey}
                expandedRows={expandedRows}
                secondLevelExpand={expandedColumnsSecondLevel}
                classesTopicPrefix={classesTopicPrefix}
              />
            ))
          ) }
          {footer}
        </div>
        {tableContentStub}
      </>
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
