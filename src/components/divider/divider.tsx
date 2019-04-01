import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './divider.module.scss';

interface Props {
  className?: string;
}

const divider = BEM(styles);

export const Divider = divider(({ className }: Props) => <div className={className} />);
