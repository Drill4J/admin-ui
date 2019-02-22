import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './app-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const appLayout = BEM(styles);

export const AppLayout = appLayout(({ className, toolbar, sidebar, children }: Props) => (
  <div className={className}>
    <SidebarWrapper>{sidebar}</SidebarWrapper>
    <ContentWrapper>
      <HeaderWrapper>{toolbar}</HeaderWrapper>
      <Content>{children}</Content>
    </ContentWrapper>
  </div>
));

const SidebarWrapper = appLayout.sidebar('div');
const ContentWrapper = appLayout.contentWrapper('div');
const HeaderWrapper = appLayout.header('div');
const Content = appLayout.content('div');
