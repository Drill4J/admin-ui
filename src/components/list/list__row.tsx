import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { ColumnProps } from './list-types';

import styles from './list.module.scss';

interface Props {
  className?: string;
  item: { [key: string]: unknown };
  columns: ColumnProps[];
  index: number;
  style: { [key: string]: string };
  testContext?: string;
}

export const ListRow = BEM(styles).row(({
  className, item, columns, style, testContext,
}: Props) => (
  <div className={className} style={style} data-test={`${testContext}:list-row`}>
    {columns.map((column) => {
      const DefaultCell = ({ value }: { value: unknown; item: { [key: string]: unknown } }) => (
        <div>{String(value)}</div>
      );
      const Cell = column.Cell || DefaultCell;
      return (
        <div key={column.name}>
          <Cell value={get(item, column.name)} item={item} />
        </div>
      );
    })}
  </div>
));
