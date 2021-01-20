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
import {
  Children, ReactElement, ReactNode, useState,
} from 'react';

import { get } from 'utils';
import { Table } from '../table';
import { Column } from '../column';
import { RowExpander } from './row-expander';
import { ColumnProps } from '../table-types';

interface Props<T> {
  data: T[];
  idKey: string;
  children: ReactElement<ColumnProps<unknown, T>>[];
  expandedColumns?: ReactElement<ColumnProps<unknown, T>>[];
  expandedContentKey: string;
  secondLevelExpand?: ReactElement<ColumnProps<unknown, T>>[];
  className?: string;
  hasSecondLevelExpand?: boolean;
  classesTopicPrefix: string;
  tableContentStub?: ReactNode | null;
}

export const ExpandableTable = <T, >({
  children,
  data,
  idKey,
  expandedColumns,
  className,
  hasSecondLevelExpand,
  tableContentStub = null,
  ...restProps
}: Props<T>) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  return (
    <Table
      className={className}
      data={data}
      expandedRows={expandedRows}
      idKey={idKey}
      tableContentStub={tableContentStub}
      expandedColumns={
        (expandedColumns
          ? [
            hasSecondLevelExpand
              ? getExpanderColumn({
                idKey,
                expandedRows,
                setExpandedRows,
              })
              : undefined,
            ...expandedColumns,
          ]
          : undefined) as ReactElement<ColumnProps<unknown, T>>[]
      }
      secondLevelExpand={expandedColumns}
      {...restProps}
    >
      {[
        getExpanderColumn({ idKey, expandedRows, setExpandedRows }),
        ...Children.toArray(children) as ReactElement<ColumnProps<unknown, T>>[],
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
}) => (
  <Column
    name="selector"
    key={idKey}
    Cell={({ item }) => (
      <RowExpander
        onClick={() => {
          expandedRows.includes(get(item, idKey))
            ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== get(item, idKey)))
            : setExpandedRows([...expandedRows, get(item, idKey)]);
        }}
        expanded={expandedRows.includes(get(item, idKey))}
        key={get(item, idKey)}
      />
    )}
    align="end"
  />
);
