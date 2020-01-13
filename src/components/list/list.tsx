import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { ListRow } from './list__row';
import { ListHeader } from './list_header';

import styles from './list.module.scss';

interface Props {
  className?: string;
  data?: Array<{ [key: string]: unknown }>;
  children: Array<
    React.ReactElement<{
      name: string;
      label: string;
      HeaderCell?: React.ComponentType<any>;
    }>
  >;
  gridTemplateColumns?: string;
}

const list = BEM(styles);

export const List = list(({ className, data = [], children, gridTemplateColumns }: Props) => {
  const columns = React.Children.map(children, (column) => column && column.props);

  return (
    <div
      className={className}
      style={{
        gridTemplateColumns: gridTemplateColumns || `repeat(${columns.length}, 1fr)`,
        gridTemplateRows: `repeat(${data.length + 1}, 80px)`,
      }}
    >
      <ListHeader columns={columns} />
      {data.map((item, index) => (
        <ListRow item={item} columns={columns} index={index} key={`row${index}`} />
      ))}
    </div>
  );
});
