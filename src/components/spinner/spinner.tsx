import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './spinner.module.scss';

interface Props {
  className?: string;
}

const spinner = BEM(styles);

export const Spinner = spinner(({ className }: Props) => (
  <div className={className}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
));
