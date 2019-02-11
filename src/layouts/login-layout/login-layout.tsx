import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as LoginLogo } from './logo.svg';

import styles from './login-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const loginLayout = BEM(styles);

export const LoginLayout = loginLayout(({ className, children }: Props) => (
  <div className={className}>
    <SideBar>{children}</SideBar>
    <LogoWrapper>
      <LoginLogo />
    </LogoWrapper>
  </div>
));

const SideBar = loginLayout.sidebar('div');
const LogoWrapper = loginLayout.logoWrapper('div');
