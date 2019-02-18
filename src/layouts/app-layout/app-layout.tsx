import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './app-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const appLayout = BEM(styles);

// TODO: ScrollWrapper realization

export const AppLayout = appLayout(({ className, children }: Props) => (
  <div className={className}>
    <Content>{children}</Content>
  </div>
));

const Content = appLayout.content('div');
