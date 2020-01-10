import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Button } from '../button';
import { ButtonType } from '../button-type';

import styles from './cancel-button.module.scss';

interface Props extends ButtonType {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const cancelButton = BEM(styles);

export const CancelButton = cancelButton(({ className, children, ...rest }: Props) => (
  <Button className={className} {...rest}>
    {children}
  </Button>
));
