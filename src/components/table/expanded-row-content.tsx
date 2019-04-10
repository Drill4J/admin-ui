import * as React from 'react';

import { TableRow } from './table__row';
import { Column } from './column';

interface Props {
  data: any;
  expandedColumns?: any[];
  idKey?: string;
  expandedRows?: string[];
}

export const ExpandedRowContent = ({
  data,
  expandedColumns = [],
  idKey = 'name',
  expandedRows = [],
}: Props) => {
  const expandedColumnsComponents = React.Children.map(
    [
      <Column
        name="name"
        colSpan={2}
        // Cell={(props) => (
        //   <CompoundCell pathKey="path" icon={<Icons.Class />} withMargin {...props} />
        // )}
      />,
      <Column name="coverage" colSpan={3} />,
    ],
    (column) => column && column.props,
  );

  return data.map((item: any, index: number) => (
    <TableRow
      key={idKey ? String(item[idKey]) : index}
      item={item}
      columns={expandedColumns}
      index={index}
      expandedColumns={expandedColumnsComponents}
      color={expandedRows.includes(String(item[idKey])) ? 'gray' : undefined}
      expandedContentKey="methods"
    />
  ));
};
