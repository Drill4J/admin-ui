import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { TableRow } from './table__row';
import { TableHeader } from './table__header';
import { Column } from './column';

import styles from './table.module.scss';

interface Props {
  className?: string;
  data?: object[];
  children: any;
  idKey?: string;
  footer?: React.ReactNode;
  sort?: object;
  onSort?: (sortField: string) => void;
  wideColumns?: boolean;
}

const table = BEM(styles);

export const Table = table(({ className, data = [], children, idKey, footer }: Props) => {
  const columns = React.Children.map(children, (column) => column && column.props);
  return (
    <table className={className}>
      <TableHeader columns={columns} />
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} item={item} columns={columns} index={index} />
        ))}
      </tbody>
      {footer}
    </table>
  );
});
