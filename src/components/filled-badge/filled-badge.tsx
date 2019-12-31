import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './filled-badge.module.scss';

interface Props {
  className?: string;
  children?: string;
}

const filledBadge = BEM(styles);

export const FilledBadge = filledBadge(({ className, children }: Props) => (
  <span className={className}>{children}</span>
));
