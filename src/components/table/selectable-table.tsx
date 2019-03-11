import * as React from 'react';

import { Table } from './table';
import { Column } from './column';
import { TableCheckbox } from './table-checkbox';

interface Props {
  data?: object[];
  children: React.ReactNode;
  idKey?: string;
  footer?: React.ReactNode;
}

export const SelectableTable = ({ children, ...props }: Props) => {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  return (
    <Table {...props}>
      <Column
        name="selector"
        Cell={({ rowIndex }) => {
          return (
            <TableCheckbox
              onClick={() =>
                selected.includes(rowIndex)
                  ? setSelected(selected.filter((item) => item !== rowIndex))
                  : setSelected([...selected, rowIndex])
              }
              selected={isAllSelected || selected.includes(rowIndex)}
            />
          );
        }}
        HeaderCell={() => (
          <TableCheckbox
            onClick={() => {
              setSelected([]);
              setIsAllSelected(!isAllSelected);
            }}
            selected={isAllSelected}
          />
        )}
      />
      {children}
    </Table>
  );
};
