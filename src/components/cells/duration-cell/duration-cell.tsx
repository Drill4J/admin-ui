import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { getDuration } from './getDuration';

import styles from './duration-cell.module.scss';

interface Props {
  className?: string;
  value?: number;
}

const durationCell = BEM(styles);

export const DurationCell = durationCell(({ className, value = 0 }: Props) => {
  const {
    hours, seconds, minutes, isLessThenOneSecond,
  } = getDuration(value);

  return (
    <div className={className}>
      {isLessThenOneSecond && <Affix>&#60;</Affix>}
      {`${hours}:${minutes}:${isLessThenOneSecond ? '01' : seconds}`}
    </div>
  );
});

const Affix = durationCell.affix('span');
