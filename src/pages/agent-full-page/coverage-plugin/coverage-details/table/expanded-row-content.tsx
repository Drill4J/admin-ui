import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { useBuildVersion } from '../../use-build-version';
import { DefaultCell } from './default-cell';
import { SecondLevelExpandContent } from './second-level-expand-content';

import styles from './table.module.scss';

interface Props {
  className?: string;
  item: any;
  expandedColumns?: any[];
  idKey?: string;
  expandedRows?: string[];
  secondLevelExpand?: any[];
  color?: string;
  classesTopicPrefix: string;
}

export const ExpandedRowContent = BEM(styles).row(({
  className,
  item = {},
  idKey = 'name',
  expandedColumns = [],
  expandedRows = [],
  secondLevelExpand = [],
  classesTopicPrefix,
}: Props) => {
  const { classes = [] }: any = useBuildVersion(`/${classesTopicPrefix}/coverage/packages/${item}`) || {};

  return classes.map((field: any, index: number) => (
    <>
      <tr
        className={className}
        style={expandedRows.includes(String(field.name)) ? { backgroundColor: 'rgba(143, 157, 168, 0.15)' } : undefined}
      >
        {expandedColumns.map((column) => {
          const Cell = column.Cell || DefaultCell;
          return (
            <td key={column.name} colSpan={column.colSpan} style={{ width: column.width }} align={column.align}>
              <Cell value={get(field, column.name)} item={field} rowIndex={index} />
            </td>
          );
        })}
      </tr>
      {expandedRows.includes(String(field[idKey])) && (
        <SecondLevelExpandContent
          data={field.methods}
          columns={secondLevelExpand}
        />
      )}
    </>
  ));
});
