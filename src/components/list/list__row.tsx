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
import 'twin.macro';

import { get } from 'utils';
import { ColumnProps } from './list-types';

interface Props {
  item: { [key: string]: unknown };
  columns: ColumnProps[];
  index: number;
  style: { [key: string]: string };
  testContext?: string;
}

export const ListRow = ({ item, columns, style, testContext }: Props) => (
  <div
    tw="grid items-center h-20 border-b border-monochrome-medium-tint"
    style={style}
    data-test={`${testContext}:list-row`}
  >
    {columns.map((column) => {
      const DefaultCell = ({ value }: { value: unknown; item: { [key: string]: unknown } }) => (
        <div>{String(value)}</div>
      );
      const Cell = column.Cell || DefaultCell;
      return (
        <div key={column.name}>
          <Cell value={get(item, column.name)} item={item} />
        </div>
      );
    })}
  </div>
);
