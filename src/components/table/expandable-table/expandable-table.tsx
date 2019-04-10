import * as React from 'react';

import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';
import { ExpandSchema } from '../table-types';

interface Props {
  data: object[];
  idKey: string;
  children: React.ReactNode;
  columnsSize?: 'wide' | 'medium';
  expandedColumns?: any[];
  expandedContentKey: string;
  expandSchema?: ExpandSchema;
}

export const ExpandableTable = ({
  children,
  data,
  idKey,
  expandedColumns,
  expandSchema,
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
  withMargin?: boolean;
}) => (
  <Column
    name="selector"
    Cell={({ item }) => {
      return (
        <RowExpander
          onClick={() => {
            expandedRows.includes(item[idKey])
              ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== item[idKey]))
              : setExpandedRows([...expandedRows, item[idKey]]);
          }}
          expanded={expandedRows.includes(item[idKey])}
        />
      );
    }}
  />
);
