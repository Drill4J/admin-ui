import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Button } from '../button';
import { ButtonProps } from '../button-types';

import styles from './link-button.module.scss';

interface Props extends ButtonProps {
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
