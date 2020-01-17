import { BEM, button } from '@redneckz/react-bem-helper';

import { ButtonProps } from './button-types';

import styles from './button.module.scss';

export const Button = BEM(styles)(
  button({
    type: 'primary',
    size: 'large',
    disabled: false,
    'data-test': '',
  } as ButtonProps),
);
