import * as React from 'react';
// eslint-disable-next-line import/no-cycle
import { TableRow } from './table__row';

interface Props {
  data: any;
  expandedColumns?: any[];
  idKey?: string;
  expandedRows?: string[];
}

export const ExpandedRowContent = ({ data = [], expandedColumns = [], idKey = 'name' }: Props) => data.map((item: any, index: number) => (
  <TableRow
    key={idKey ? String(item[idKey]) : index}
    item={item}
    columns={expandedColumns}
    index={index}
    nested
    nestedLast={index === data.length - 1}
  />
));
