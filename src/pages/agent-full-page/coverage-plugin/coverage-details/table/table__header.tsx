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
import tw from 'twin.macro';

import {
  useTableActionsDispatch, setSort, useTableActionsState,
} from 'modules';
import { DefaultHeaderCell } from './default-header-cell';
import { ColumnProps } from './table-types';

interface Props<T> {
  className?: string;
  columns: ColumnProps<unknown, T>[];
  expandedColumnsLength?: number;
}

export const TableHeader = <T, >({ columns, expandedColumnsLength }: Props<T>) => {
  const dispatch = useTableActionsDispatch();
  const { sort: [sort] } = useTableActionsState();
  const gridTemplateColumns = expandedColumnsLength
    ? `32px 40% repeat(${columns.length - 2}, 1fr)`
    : `2fr repeat(${columns.length - 1}, 1fr)`;
  return (
    <div
      css={[
        tw`sticky -top-1 z-40 bg-monochrome-white`,
        tw`grid items-center h-13`,
        tw`text-14 leading-20 font-bold border-b border-t border-monochrome-black`,
      ]}
      style={{ gridTemplateColumns }}
    >
      {columns.map((column) => {
        const { name, HeaderCell, align = 'end' } = column;
        return (
          <div tw="px-4" key={name} style={{ justifySelf: align }}>
            {HeaderCell
              ? HeaderCell({ column })
              : <DefaultHeaderCell column={column} sort={sort} onSort={(cellSort) => dispatch(setSort(cellSort))} />}
          </div>
        );
      })}
    </div>
  );
};
