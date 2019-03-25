import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './table-checkbox.module.scss';
import { Icons } from '../icon';

interface Props {
  className?: string;
  onClick?: () => any;
  selected?: boolean;
}

const tableCheckbox = BEM(styles);

export const TableCheckbox = tableCheckbox(({ className, onClick }: Props) => (
  <div className={className} onClick={onClick}>
    <Icons.Checkbox />
  </div>
));
