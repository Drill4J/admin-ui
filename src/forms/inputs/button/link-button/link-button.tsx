import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Button } from '../button';
import { ButtonType } from '../button-type';

import styles from './link-button.module.scss';

interface Props extends ButtonType {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const linkButton = BEM(styles);

export const LinkButton = linkButton(({ className, children, ...rest }: Props) => (
  <Button className={className} {...rest}>
    {children}
  </Button>
));
