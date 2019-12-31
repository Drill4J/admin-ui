import * as React from 'react';

import { TableRow } from './table__row';

interface Props {
  data: any;
  expandedColumns?: any[];
  idKey?: string;
  expandedRows?: string[];
}

export const ExpandedRowContent = ({
  data = [],
  expandedColumns = [],
  idKey = 'name',
  expandedRows = [],
}: Props) => {
  return (
    <div style={{ border: '2px solid #D9ECFF' }} key="foooo">
      {data.map((item: any, index: number) => (
        <TableRow
          key={idKey ? String(item[idKey]) : index}
          item={item}
          columns={expandedColumns}
          index={index}
          color={expandedRows.includes(String(item[idKey])) ? 'gray' : undefined}
          expandedContentKey="methods"
        />
      ))}
    </div>
  );
};
