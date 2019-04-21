import * as React from 'react';

import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';

interface Props {
  data: object[];
  idKey: string;
  children: React.ReactNode;
  columnsSize?: 'wide' | 'medium';
  expandedColumns?: any[];
  expandedContentKey: string;
  secondLevelExpand: any[];
}

export const ExpandableTable = ({
  children,
  data,
  idKey,
  expandedColumns,
  // @ts-ignore
  ...restProps,
}: Props) => {
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  return (
    <Table
      data={data}
      expandedRows={expandedRows}
      idKey={idKey}
      expandedColumns={
        expandedColumns
          ? [getExpanderColumn({ idKey, expandedRows, setExpandedRows }), ...expandedColumns]
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
    Cell={({ item }) => {
      return (
        <RowExpander
          onClick={() => {
            expandedRows.includes(item[idKey])
              ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== item[idKey]))
              : setExpandedRows([...expandedRows, item[idKey]]);
          }}
          expanded={expandedRows.includes(item[idKey])}
          key={item[idKey]}
        />
      );
    }}
  />
);
