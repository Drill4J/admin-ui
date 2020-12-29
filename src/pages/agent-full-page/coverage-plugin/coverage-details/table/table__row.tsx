import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { DefaultCell } from './default-cell';
import { ExpandedRowContent } from './expanded-row-content';

import styles from './table-row.module.scss';

interface Props {
  className?: string;
  item: { [key: string]: unknown };
  columns: any[];
  index: number;
  color?: 'blue' | 'gray' | 'yellow';
  expandedColumns?: any[];
  secondLevelExpand?: any[];
  expandedContentKey?: string;
  expandedRows?: string[];
  classesTopicPrefix: string;
}

const tableRow = BEM(styles);

export const TableRow = tableRow(
  ({
    className,
    item,
    columns,
    index,
    expandedContentKey = '',
    color,
    expandedColumns = [],
    secondLevelExpand = [],
    expandedRows = [],
    classesTopicPrefix,
  }: Props) => {
    const gridTemplateColumns = expandedColumns?.length
      ? `32px 40% repeat(${columns.length - 2}, 1fr)`
      : `2fr repeat(${columns.length - 1}, 1fr)`;
    return (
      <>
        <div className={className} style={{ display: 'grid', gridTemplateColumns, backgroundColor: color ? '#F8F9FB' : undefined }}>
          {columns.map((column) => {
            const Cell = column.Cell || DefaultCell;
            return (
              <TableRowCell key={column.name} type={column.align || 'end'}>
                <Cell value={get(item, column.name)} item={item} rowIndex={index} testContext={column?.testContext} />
              </TableRowCell>
            );
          })}
        </div>
        {color && (
          <ExpandedRowContent
            key={String(item[expandedContentKey])}
            item={item[expandedContentKey]}
            expandedColumns={expandedColumns}
            secondLevelExpand={secondLevelExpand}
            expandedRows={expandedRows}
            classesTopicPrefix={classesTopicPrefix}
          />
        )}
      </>
    );
  },
);

const TableRowCell = tableRow.tableRowCell('div');
