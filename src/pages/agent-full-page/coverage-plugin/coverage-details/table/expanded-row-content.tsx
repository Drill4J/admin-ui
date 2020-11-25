import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { useBuildVersion } from 'hooks';
import { DefaultCell } from './default-cell';
import { SecondLevelExpandContent } from './second-level-expand-content';

import styles from './table-row.module.scss';

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

export const ExpandedRowContent = BEM(styles)(({
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
      <div
        className={className}
        style={{
          display: 'grid',
          gridTemplateColumns: `64px calc(40% - 32px) repeat(${expandedColumns.length - 2}, 1fr)`,
          backgroundColor: expandedRows.includes(String(field.name)) ? '#F8F9FB' : undefined,
        }}
      >
        {expandedColumns.map((column) => {
          const Cell = column.Cell || DefaultCell;
          return (
            <TableRowCell key={column.name} type={column.align || 'end'}>
              <Cell value={get(field, column.name)} item={field} rowIndex={index} />
            </TableRowCell>
          );
        })}
      </div>
      {expandedRows.includes(String(field[idKey])) && (
        <SecondLevelExpandContent
          data={field.methods}
          columns={secondLevelExpand}
        />
      )}
    </>
  ));
});

const TableRowCell = BEM(styles).tableRowCell('div');
