import * as React from 'react';

import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';

interface Props {
  data: object[];
  onExpand: (expandedRows: string[]) => any;
  idKey: string;
  children: React.ReactNode;
  columnsSize?: 'wide' | 'medium';
  expandedColumns?: any[];
  expandedContentKey: string;
}

export const ExpandableTable = ({
  children,
  data,
  idKey,
  // expandedRows,
  onExpand,
  // tslint:disable-next-line
  ...restProps
}: Props) => {
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  return (
    <Table data={data} expandedRows={expandedRows} idKey={idKey} {...restProps}>
      <Column
        name="selector"
        Cell={({ item }) => {
          return (
            <RowExpander
              onClick={() => {
                expandedRows.includes(item[idKey])
                  ? setExpandedRows(
                      expandedRows.filter((selectedItem) => selectedItem !== item[idKey]),
                    )
                  : setExpandedRows([...expandedRows, item[idKey]]);
              }}
              expanded={expandedRows.includes(item[idKey])}
            />
          );
        }}
      />
      {children}
    </Table>
  );
};
