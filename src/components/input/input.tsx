import * as React from 'react';
import { BEM, input as bemInput } from '@redneckz/react-bem-helper';

import { INPUT_PROPS } from './input-props';

import styles from './input.module.scss';

interface Props {
  className?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  rounded?: boolean;
  disabled?: boolean;
  type?: string;
  checked?: boolean;
  value?: any;
  onChange?: () => void;
}

const input = BEM(styles);

const INPUT_PROPS_OBJ = Object.assign({}, ...INPUT_PROPS.map((key) => ({ [key]: undefined })));

export const Input = input(({ className, icon, ...restProps }: Props) => (
  <div className={className}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    <InputElement {...restProps} />
  </div>
));

const InputElement = input.inputElement(
  bemInput({
    ...INPUT_PROPS_OBJ,
    value: '',
  } as {}),
);
const IconWrapper = input.iconWrapper('div');
