import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ClassCoverage } from '../../../../../types/class-coverage';

import styles from './associated-test-column.module.scss';

interface Props {
  className?: string;
  value: string;
  item: ClassCoverage;
  onClick: (arg?: string) => void;
}

const associatedTestColumn = BEM(styles);

export const AssociatedTestColumn = associatedTestColumn(
  ({ className, value, item: { id }, onClick }: Props) => (
    <span className={className}>
      {value ? <Value onClick={() => onClick(id)}>{value}</Value> : 'n/a'}
    </span>
  ),
);

const Value = associatedTestColumn.value('span');
