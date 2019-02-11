import { BEM, button } from '@redneckz/react-bem-helper';

import styles from './button.module.scss';

export const Button = BEM(styles)(
  button({
    type: 'button',
  } as { type?: string; disabled?: boolean }),
);
