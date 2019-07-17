import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './section.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  header: React.ReactNode;
}

const section = BEM(styles);

export const Section = section(({ className, header, children }: Props) => (
  <div className={className}>
    <Header>{header}</Header>
    {children}
  </div>
));

const Header = section.header('div');
