import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './error-message.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const errorMessage = BEM(styles);

export const ErrorMessage = errorMessage(({ className, children }: Props) => (
  <div className={className}>{children}</div>
));
