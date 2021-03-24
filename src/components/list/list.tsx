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
import { Children, ComponentType, ReactElement } from 'react';
import { nanoid } from 'nanoid';
import 'twin.macro';

import { ListRow } from './list__row';
import { ListHeader } from './list__header';

interface Props {
  data?: Array<{ [key: string]: unknown }>;
  children: Array<
  ReactElement<{
    name: string;
    label: string;
    HeaderCell?: ComponentType<unknown>;
  }>
  >;
  gridTemplateColumns?: string;
  testContext?: string;
}

export const List = ({
  data = [], children, gridTemplateColumns, testContext,
}: Props) => {
  const columns = Children.map(children, (column) => column && column.props);
  return (
    <div
      tw="grid items-center"
      style={{
        gridTemplateRows: `repeat(${data.length + 1}, 80px)`,
      }}
    >
      <ListHeader
        columns={columns}
        style={{
          gridTemplateColumns: gridTemplateColumns || `repeat(${columns.length}, 1fr)`,
        }}
      />
      {data.map((item, index) => (
        <ListRow
          item={item}
          columns={columns}
          index={index}
          key={nanoid()}
          style={{
            gridTemplateColumns: gridTemplateColumns || `repeat(${columns.length}, 1fr)`,
          }}
          testContext={testContext}
        />
      ))}
    </div>
  );
};
