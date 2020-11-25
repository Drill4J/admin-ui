import * as React from 'react';

import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';

interface Props {
  data: Record<string, unknown>[];
  idKey: string;
  children: React.ReactNode;
  expandedColumns?: any[];
  expandedContentKey: string;
  secondLevelExpand?: any[];
  className?: string;
  hasSecondLevelExpand?: boolean;
  classesTopicPrefix: string;
  tableContentStub?: React.ReactNode | null;
}

export const ExpandableTable = ({
  children,
  data,
  idKey,
  expandedColumns,
  className,
  hasSecondLevelExpand,
  tableContentStub = null,
  ...restProps
}: Props) => {
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
  return (
    <Table
      className={className}
      data={data as any}
      expandedRows={expandedRows}
      idKey={idKey}
      tableContentStub={tableContentStub}
      expandedColumns={
        expandedColumns
          ? [
            hasSecondLevelExpand
              ? getExpanderColumn({
                idKey,
                expandedRows,
                setExpandedRows,
              })
              : null,
            ...expandedColumns,
          ]
          : undefined
      }
      secondLevelExpand={expandedColumns}
      {...restProps}
    >
      {[
        getExpanderColumn({ idKey, expandedRows, setExpandedRows }),
        ...React.Children.toArray(children),
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
          expandedRows.includes(item[idKey])
            ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== item[idKey]))
            : setExpandedRows([...expandedRows, item[idKey]]);
        }}
        expanded={expandedRows.includes(item[idKey])}
        key={item[idKey]}
      />
    )}
    align="end"
  />
);
