import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { useBuildVersion } from 'hooks';
import { Package } from 'types/package';
import { ColumnProps } from './table-types';
import { DefaultCell } from './default-cell';
import { SecondLevelExpandContent } from './second-level-expand-content';

import styles from './table-row.module.scss';

interface Props<T> {
  className?: string;
  item: string;
  expandedColumns?: ColumnProps<unknown, T>[];
  expandedRows?: string[];
  secondLevelExpand?: ColumnProps<unknown, T>[];
  color?: string;
  classesTopicPrefix: string;
}

const expandedRowContent = BEM(styles);

export const ExpandedRowContent = expandedRowContent(<T, >({
  className,
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
                  <Cell value={get(field, column.name)} item={field as T} rowIndex={index} testContext={column?.testContext} />
                </TableRowCell>
              );
            })}
          </div>
          {expandedRows.includes(String(field.name)) && (
            <SecondLevelExpandContent
              data={field.methods}
              columns={secondLevelExpand}
            />
          )}
        </>
      ))}
    </>
  );
});

const TableRowCell = expandedRowContent.tableRowCell('div');
