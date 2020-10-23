import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './duration-cell.module.scss';

interface Props {
  className?: string;
  value?: number;
}

const durationCell = BEM(styles);

export const DurationCell = durationCell(({ className, value = 0 }: Props) => {
  const seconds = (`0${Math.floor(value / 1000) % 60}`).slice(-2);
  const minutes = (`0${Math.floor(value / 60000) % 60}`).slice(-2);
  const hours = (`0${Math.floor(value / 3600000)}`).slice(-2);
  const affix = value > 0 && Math.floor(value / 1000) % 60 === 0;

  return (
    <div className={className}>
      {affix && <Affix>&#60;</Affix>}
      {`${hours}:${minutes}:${affix ? '01' : seconds}`}
    </div>
  );
});

const Affix = durationCell.affix('span');
