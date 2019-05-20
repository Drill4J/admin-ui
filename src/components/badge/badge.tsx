import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './badge.module.scss';

interface Props {
  className?: string;
  text?: string;
}

const badge = BEM(styles);

export const Badge = badge(({ className, text }: Props) => (
  <span className={className}>{text}</span>
));
