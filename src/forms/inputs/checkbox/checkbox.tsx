import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components/icon';

import styles from './checkbox.module.scss';

interface Props {
  className?: string;
  onClick?: () => any;
  selected?: boolean;
}

const checkbox = BEM(styles);

export const Checkbox = checkbox(({ className, onClick }: Props) => (
  <div className={className} onClick={onClick}>
    <IconWrapper>
      <Icons.Checkbox />
    </IconWrapper>
  </div>
));

const IconWrapper = checkbox.iconWrapper('div');
