import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './clickable-cell.module.scss';

export const ClickableCell = BEM(styles)(div({ onClick: () => {}, 'data-test': '' } as { disabled?: boolean; 'data-test'?: string }));
