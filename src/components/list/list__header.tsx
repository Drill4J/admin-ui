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
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';

import { ColumnProps } from './list-types';

import styles from './list.module.scss';

interface Props {
  className?: string;
  columns: ColumnProps[];
  style: { [key: string]: string };
}

export const ListHeader = BEM(styles).header(({ className, columns, style }: Props) => (
  <div className={className} style={style}>
    {columns.map((column) => {
      const DefaultHeaderCell = ({ column: { label } }: { column: ColumnProps }) => (
        <div>{label}</div>
      );
      const HeaderCell = column.HeaderCell || DefaultHeaderCell;
      return <HeaderCell column={column} key={nanoid()} />;
    })}
  </div>
));
