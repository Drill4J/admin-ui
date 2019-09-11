import * as React from 'react';

import { Inputs } from '../../forms';
import { Table } from './table';
import { Column } from './column';

interface Props {
  data: any[];
  children: React.ReactNode;
  idKey: string;
  footer?: React.ReactNode;
  selectedRows: string[];
  onSelect: (selectedItems: string[]) => any;
  columnsSize?: 'wide' | 'medium';
  checkboxDescriptor?: <O>(item: O) => boolean;
}

export const SelectableTable = ({
  children,
  data,
  onSelect,
  idKey,
  selectedRows,
  checkboxDescriptor,
  // tslint:disable-next-line
  ...restProps
}: Props) => {
  const isAllSelected = selectedRows.length === data.length;

  return (
    <Table data={data} selectedRows={selectedRows} idKey={idKey} {...restProps}>
      <Column
        name="selector"
        Cell={({ item }) => {
          const isSelectable = checkboxDescriptor ? checkboxDescriptor(item) : true;
          return isSelectable ? (
            <Inputs.Checkbox
              onClick={() => {
                selectedRows.includes(item[idKey])
                  ? onSelect(selectedRows.filter((selectedItem) => selectedItem !== item[idKey]))
                  : onSelect([...selectedRows, item[idKey]]);
              }}
              selected={isAllSelected || selectedRows.includes(item[idKey])}
            />
          ) : null;
        }}
        HeaderCell={() => (
          <Inputs.Checkbox
            onClick={() => {
              onSelect(
                !isAllSelected
                  ? data.reduce((acc, item: any) => {
                      if (!checkboxDescriptor) {
                        return [...acc, String(item[idKey])];
                      }
                      return checkboxDescriptor(item) ? [...acc, String(item[idKey])] : acc;
                    }, [])
                  : [],
              );
            }}
            selected={isAllSelected}
          />
        )}
      />
      {children}
    </Table>
  );
};
