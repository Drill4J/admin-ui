import * as React from 'react';

import { Table } from './table';
import { Column } from './column';
import { TableCheckbox } from './table-checkbox';

interface Props {
  data: object[];
  children: React.ReactNode;
  idKey: string;
  footer?: React.ReactNode;
  onSelect?: (selectedItems: string[]) => any;
}

export const SelectableTable = ({ children, data, onSelect, idKey, ...props }: Props) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  return (
    <Table data={data} {...props}>
      <Column
        name="selector"
        Cell={({ item }) => {
          return (
            <TableCheckbox
              onClick={() => {
                selected.includes(item[idKey])
                  ? handleSelect(selected.filter((selectedItem) => selectedItem !== item[idKey]))
                  : handleSelect([...selected, item[idKey]]);
              }}
              selected={isAllSelected || selected.includes(item[idKey])}
            />
          );
        }}
        HeaderCell={() => (
          <TableCheckbox
            onClick={() => {
              handleSelect(!isAllSelected ? data.map((item: any) => String(item[idKey])) : []);
              setIsAllSelected(!isAllSelected);
            }}
            selected={isAllSelected}
          />
        )}
      />
      {children}
    </Table>
  );

  function handleSelect(selectedItems: string[]) {
    setSelected(selectedItems);
    if (onSelect) {
      onSelect(selectedItems);
    }
  }
};
