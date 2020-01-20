import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Table, Column } from 'components';
import { RowExpander } from './row-expander';

import styles from './expandable-table.module.scss';

interface Props {
  data: object[];
  idKey: string;
  children: React.ReactNode;
  columnsSize?: 'wide' | 'medium';
  expandedColumns?: any[];
  expandedContentKey: string;
  secondLevelExpand?: any[];
  className?: string;
  hasSecondLevelExpand?: boolean;
}

const expandableTable = BEM(styles);

export const ExpandableTable = expandableTable(
  ({
    children,
    data,
    idKey,
    expandedColumns,
    className,
    hasSecondLevelExpand,
    ...restProps
  }: Props) => {
    const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
    return (
      <Table
        className={className}
        data={data as any}
        expandedRows={expandedRows}
        idKey={idKey}
        expandedColumns={
          expandedColumns
            ? [
              hasSecondLevelExpand
                ? getExpanderColumn({
                  idKey,
                  expandedRows,
                  setExpandedRows,
                  withMargin: true,
                })
                : null,
              ...expandedColumns,
            ]
            : undefined
        }
        secondLevelExpand={expandedColumns}
        {...restProps}
      >
        {[
          getExpanderColumn({ idKey, expandedRows, setExpandedRows }),
          ...React.Children.toArray(children),
        ]}
      </Table>
    );
  },
);

const getExpanderColumn = ({
  expandedRows,
  setExpandedRows,
  idKey,
  withMargin,
}: {
  idKey: string;
  expandedRows: string[];
  setExpandedRows: (arg: string[]) => void;
  withMargin?: boolean;
}) => (
  <Column
    name="selector"
    key={idKey}
    Cell={({ item }) => (
      <RowExpander
        onClick={() => {
          expandedRows.includes(item[idKey])
            ? setExpandedRows(expandedRows.filter((selectedItem) => selectedItem !== item[idKey]))
            : setExpandedRows([...expandedRows, item[idKey]]);
        }}
        expanded={expandedRows.includes(item[idKey])}
        key={item[idKey]}
        withMargin={withMargin}
      />
    )}
  />
);
