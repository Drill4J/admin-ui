import { BEM, button } from '@redneckz/react-bem-helper';

import styles from './button.module.scss';

export const Button = BEM(styles)(
  button({
    type: 'button',
    disabled: false,
  } as { type?: string; disabled?: boolean }),
);
