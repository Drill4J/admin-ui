import * as React from 'react';

import { Table } from './table';
import { Column } from './column';
import { TableCheckbox } from '../table-checkbox';

interface Props {
  data: object[];
  children: React.ReactNode;
  idKey: string;
  footer?: React.ReactNode;
  selectedRows: string[];
  onSelect: (selectedItems: string[]) => any;
  columnsSize?: 'wide' | 'medium';
}

export const SelectableTable = ({
  children,
  data,
  onSelect,
  idKey,
  selectedRows,
  // tslint:disable-next-line
  ...restProps
}: Props) => {
  const isAllSelected = selectedRows.length === data.length;

  return (
    <Table data={data} {...restProps}>
      <Column
        name="selector"
        Cell={({ item }) => {
          return (
            <TableCheckbox
              onClick={() => {
                selectedRows.includes(item[idKey])
                  ? onSelect(selectedRows.filter((selectedItem) => selectedItem !== item[idKey]))
                  : onSelect([...selectedRows, item[idKey]]);
              }}
              selected={isAllSelected || selectedRows.includes(item[idKey])}
            />
          );
        }}
        HeaderCell={() => (
          <TableCheckbox
            onClick={() => {
              onSelect(!isAllSelected ? data.map((item: any) => String(item[idKey])) : []);
            }}
            selected={isAllSelected}
          />
        )}
      />
      {children}
    </Table>
  );
};
