import { Children, ComponentType, ReactElement } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';

import { ListRow } from './list__row';
import { ListHeader } from './list__header';

import styles from './list.module.scss';

interface Props {
  className?: string;
  data?: Array<{ [key: string]: unknown }>;
  children: Array<
  ReactElement<{
    name: string;
    label: string;
    HeaderCell?: ComponentType<unknown>;
  }>
  >;
  gridTemplateColumns?: string;
  testContext?: string;
}

const list = BEM(styles);

export const List = list(({
  className, data = [], children, gridTemplateColumns, testContext,
}: Props) => {
  const columns = Children.map(children, (column) => column && column.props);
  return (
    <div
      className={className}
      style={{
        gridTemplateRows: `repeat(${data.length + 1}, 80px)`,
      }}
    >
      <ListHeader
        columns={columns}
        style={{
          gridTemplateColumns: gridTemplateColumns || `repeat(${columns.length}, 1fr)`,
        }}
      />
      {data.map((item, index) => (
        <ListRow
          item={item}
          columns={columns}
          index={index}
          key={nanoid()}
          style={{
            gridTemplateColumns: gridTemplateColumns || `repeat(${columns.length}, 1fr)`,
          }}
          testContext={testContext}
        />
      ))}
    </div>
  );
});
