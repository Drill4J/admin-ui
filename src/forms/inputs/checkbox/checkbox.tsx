import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components/icon';

import styles from './checkbox.module.scss';

interface Props {
  className?: string;
  onClick?: () => any;
  selected?: boolean;
  label?: string;
  withoutMargin?: boolean;
  disabled?: boolean;
}

const checkbox = BEM(styles);

export const Checkbox = checkbox(({ className, onClick, label }: Props) => (
  <div className={className} onClick={onClick}>
    <IconWrapper>
      <Icons.Checkbox />
    </IconWrapper>
    <Label>{label}</Label>
  </div>
));

const IconWrapper = checkbox.iconWrapper('div');
const Label = checkbox.label('div');
