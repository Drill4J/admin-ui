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
import tw, { styled } from 'twin.macro';

import { get } from 'utils';
import { useBuildVersion } from 'hooks';
import { Package } from 'types/package';
import { ColumnProps } from './table-types';
import { DefaultCell } from './default-cell';
import { SecondLevelExpandContent } from './second-level-expand-content';
import { TableRowCell } from './table-row-cell';

interface Props<T> {
  item: string;
  expandedColumns?: ColumnProps<unknown, T>[];
  expandedRows?: string[];
  secondLevelExpand?: ColumnProps<unknown, T>[];
  color?: string;
  classesTopicPrefix: string;
}

const Content = styled.div`
  ${tw`grid items-center min-h-40px border-b border-monochrome-medium-tint`}
`;

export const ExpandedRowContent = <T, >({
  item,
  expandedColumns = [],
  expandedRows = [],
  secondLevelExpand = [],
  classesTopicPrefix,
}: Props<T>) => {
  const { classes = [] } = useBuildVersion<Package>(`/${classesTopicPrefix}/coverage/packages/${item}`) || {};

  return (
    <>
      {classes.map((field, index) => (
        <div key={field.id}>
          <Content
            style={{
              gridTemplateColumns: `64px calc(40% - 32px) repeat(${expandedColumns.length - 2}, 1fr)`,
              backgroundColor: expandedRows.includes(String(field.name)) ? '#F8F9FB' : undefined,
            }}
          >
            {expandedColumns.map((column) => {
              const Cell = column.Cell || DefaultCell;
              return (
                <TableRowCell key={column.name} type={column.align || 'end'}>
                  <Cell value={get(field, column.name)} item={field as T} rowIndex={index} testContext={column?.testContext} />
                </TableRowCell>
              );
            })}
          </Content>
          {expandedRows.includes(String(field.name)) && (
            <SecondLevelExpandContent
              data={field.methods}
              columns={secondLevelExpand}
            />
          )}
        </div>
      ))}
    </>
  );
};
