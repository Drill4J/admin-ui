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
export interface CellProps<T, I> {
  value?: T;
  item?: I;
  rowIndex?: number;
  testContext?: string;
}

export type Cell<T, I> = (props: CellProps<T, I>) => JSX.Element;
export type Order = 'ASC' | 'DESC' | null;
export type Align = 'start' | 'end' | 'center' | 'stretch';

export interface Sort {
  field: string;
  order: Order;
}

export interface ColumnProps<T, I> {
  name: string;
  Cell?: Cell<T, I>;
  HeaderCell?: (props: { column: ColumnProps<T, I> }) => JSX.Element;
  label?: React.ReactNode;
  align?: Align;
  testContext?: string;
}

export interface ExpandSchema {
  key: string;
  columns: React.ReactNode | React.ReactNode[];
  children: ExpandSchema;
}
