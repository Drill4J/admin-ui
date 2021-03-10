/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Children, ReactElement, ReactNode } from 'react';
import 'twin.macro';

import { get } from 'utils';
import { TableRow } from './table__row';
import { TableHeader } from './table__header';
import { ColumnProps } from './table-types';

interface Props<T> {
  data?: T[];
  children: ReactElement<ColumnProps<unknown, T>> | ReactElement<ColumnProps<unknown, T>>[];
  idKey?: string;
  footer?: ReactNode;
  expandedRows?: string[];
  expandedColumns?: ReactElement<ColumnProps<unknown, T>>[];
  secondLevelExpand?: ReactElement<ColumnProps<unknown, T>>[];
  expandedContentKey?: string;
  withoutHeader?: boolean;
  selectedRows?: string[];
  classesTopicPrefix: string;
  tableContentStub?: ReactNode | null;
}

export const Table = <T, >({
  data = [],
  children,
  idKey = '',
  footer,
  expandedRows = [],
  expandedColumns,
  expandedContentKey,
  secondLevelExpand,
  withoutHeader,
  selectedRows = [],
  classesTopicPrefix,
  tableContentStub = null,
}: Props<T>) => {
  const columns = Children.map(children, (column) => column && column.props);

  const expandedColumnsComponents = Children.map(
    expandedColumns,
    (column) => column && column.props,
  );
  const expandedColumnsSecondLevel = Children.map(
    secondLevelExpand,
    (column) => column && column.props,
  );

  return (
    <>
      <div tw="w-full text-14 leading-16 text-monochrome-black">
        {!withoutHeader && <TableHeader columns={columns} expandedColumnsLength={expandedColumns?.length} />}
        {data.length > 0 && (
          data.map((item, index) => (
            <TableRow
              key={idKey ? String(get(item, idKey)) : index}
              item={item}
              columns={columns}
              index={index}
              expandedColumns={expandedColumnsComponents}
              color={getRowColor({ expandedRows, selectedRows, itemId: String(get(item, idKey)) })}
              expandedContentKey={expandedContentKey}
              expandedRows={expandedRows}
              secondLevelExpand={expandedColumnsSecondLevel}
              classesTopicPrefix={classesTopicPrefix}
            />
          ))
        ) }
        {footer}
      </div>
      {tableContentStub}
    </>
  );
};

// eslint-disable-next-line consistent-return
function getRowColor({
  expandedRows,
  selectedRows,
  itemId,
}: {
  expandedRows: string[];
  selectedRows: string[];
  itemId: string;
}) {
  if (expandedRows.includes(itemId)) {
    return 'blue';
  }
  if (selectedRows.includes(itemId)) {
    return 'yellow';
  }
}
