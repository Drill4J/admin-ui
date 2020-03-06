import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from 'components';

import styles from './sort-arrows.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
  sort?: 'asc' | 'desc' | 'unsorted';
}

const sortArrows = BEM(styles);

export const SortArrows = sortArrows(({ className, onClick, sort }: Props) => (
  <div className={className} onClick={onClick}>
    <SortButton type={sort}>
      <Icons.SortingArrow />
      <Icons.SortingArrow rotate={180} />
    </SortButton>
  </div>
));

const SortButton = sortArrows.sortButton('div');
