import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from 'components';

import styles from './sort-arrows.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
  sort?: 'asc' | 'desc';
}

const sortArrows = BEM(styles);

export const SortArrows = sortArrows(({
  className, onClick, sort,
}: Props) => (
  <div className={className} onClick={onClick}>
    <SortArrowWrapper>
      <SortArrow active={sort === 'desc'} />
      <SortArrow active={sort === 'asc'} rotate={180} />
    </SortArrowWrapper>
  </div>
));

const SortArrowWrapper = sortArrows.sortArrowWrapper('div');
const SortArrow: React.FC<{
  active?: boolean;
  sort?: 'asc' | 'desc';
  rotate?: number;
}> = sortArrows.sortArrow(Icons.SortingArrow);
