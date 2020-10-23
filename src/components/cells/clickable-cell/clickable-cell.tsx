import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './clickable-cell.module.scss';

export const ClickableCell = BEM(styles)(div({ onClick: () => {} } as { disabled?: boolean }));
