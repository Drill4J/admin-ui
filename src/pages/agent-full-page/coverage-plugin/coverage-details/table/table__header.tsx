import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, SortArrows } from '@drill4j/ui-kit';

import {
  useTableActionsDispatch, toggleOrder, useTableActionsState,
} from 'modules';
import { DefaultHeaderCell } from './default-header-cell';

import styles from './table.module.scss';

interface Props {
  className?: string;
  columns: any[];
}

export const TableHeader = BEM(styles).header(({ columns, className }: Props) => {
  const dispatch = useTableActionsDispatch();
  const { sort: { fieldName, order } } = useTableActionsState();
  return (
    <thead className={className}>
      <tr>
        {columns.map((column) => {
          const HeaderCell = column.HeaderCell || DefaultHeaderCell;
          return (
            <th key={column.name} style={{ width: column.width }}>
              <Panel>
                <HeaderCell column={column} />
                {column.name !== 'selector' && (
                  <SortArrows
                    onClick={() => dispatch(toggleOrder(column.name))}
                    order={column.name === fieldName ? order : null}
                  />
                )}
              </Panel>
            </th>
          );
        })}
      </tr>
    </thead>
  );
});
