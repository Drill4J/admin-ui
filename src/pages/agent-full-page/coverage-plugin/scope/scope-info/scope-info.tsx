import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './scope-info.module.scss';

interface Props {
  className?: string;
}

const scopeInfo = BEM(styles);

export const ScopeInfo = scopeInfo(({ className }: Props) => (
  <div className={className}>
    <Header>My first testing scope</Header>
  </div>
));

const Header = scopeInfo.header('div');
