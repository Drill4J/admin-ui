import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './plugins-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const pluginsLayout = BEM(styles);

export const PluginsLayout = pluginsLayout(({ className, toolbar, sidebar, children }: Props) => (
  <div className={className}>
    <SidebarWrapper>{sidebar}</SidebarWrapper>
    <ContentWrapper>
      <HeaderWrapper>{toolbar}</HeaderWrapper>
      <Content>{children}</Content>
    </ContentWrapper>
  </div>
));

const SidebarWrapper = pluginsLayout.sidebar('div');
const ContentWrapper = pluginsLayout.contentWrapper('div');
const HeaderWrapper = pluginsLayout.header('div');
const Content = pluginsLayout.content('div');
