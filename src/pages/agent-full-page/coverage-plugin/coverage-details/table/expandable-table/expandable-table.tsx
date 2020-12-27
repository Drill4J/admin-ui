import * as React from 'react';

import { get } from 'utils';
import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';
import { ColumnProps } from '../table-types';

interface Props<T> {
  data: T[];
  idKey: string;
  children: React.ReactElement<ColumnProps<unknown, T>>[];
  expandedColumns?: React.ReactElement<ColumnProps<unknown, T>>[];
  expandedContentKey: string;
  secondLevelExpand?: React.ReactElement<ColumnProps<unknown, T>>[];
  className?: string;
  hasSecondLevelExpand?: boolean;
  classesTopicPrefix: string;
  tableContentStub?: React.ReactNode | null;
}

export const ExpandableTable = <T, >({
  children,
  data,
  idKey,
  expandedColumns,
  className,
  hasSecondLevelExpand,
  tableContentStub = null,
  ...restProps
}: Props<T>) => {
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
  return (
    <Table
      className={className}
      data={data}
      expandedRows={expandedRows}
      idKey={idKey}
      tableContentStub={tableContentStub}
      expandedColumns={
        (expandedColumns
          ? [
            hasSecondLevelExpand
              ? getExpanderColumn({
                idKey,
                expandedRows,
                setExpandedRows,
              })
              : undefined,
            ...expandedColumns,
          ]
          : undefined) as React.ReactElement<ColumnProps<unknown, T>>[]
      }
      secondLevelExpand={expandedColumns}
      {...restProps}
    >
      {[
        getExpanderColumn({ idKey, expandedRows, setExpandedRows }),
        ...React.Children.toArray(children) as React.ReactElement<ColumnProps<unknown, T>>[],
      ]}
    </Table>
  );
};

const getExpanderColumn = ({
  expandedRows,
  setExpandedRows,
  idKey,
}: {
  idKey: string;
  expandedRows: string[];
  setExpandedRows: (arg: string[]) => void;
}) => (
  <Column
    name="selector"
    key={idKey}
    Cell={({ item }) => (
      <RowExpander
        onClick={() => {
          expandedRows.includes(get(item, idKey))
            ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== get(item, idKey)))
            : setExpandedRows([...expandedRows, get(item, idKey)]);
        }}
        expanded={expandedRows.includes(get(item, idKey))}
        key={get(item, idKey)}
      />
    )}
    align="end"
  />
);
