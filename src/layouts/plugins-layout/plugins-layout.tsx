import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import styles from './plugins-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  footer?: React.ReactNode;
}

const pluginsLayout = BEM(styles);

export const PluginsLayout = pluginsLayout(
  ({
    className, toolbar, header, breadcrumbs, children, footer, sidebar,
  }: Props) => (
    <div className={className}>
      <ToolbarWrapper>{toolbar}</ToolbarWrapper>
      <HeaderWrapper>{header}</HeaderWrapper>
      {breadcrumbs && <BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>}
      <WithSidebarWrapper>
        <SidebarWrapper>{sidebar}</SidebarWrapper>
        <OverflowWrapper verticalAlign="start" direction="column">
          <Content>{children}</Content>
          <Footer>{footer}</Footer>
        </OverflowWrapper>
      </WithSidebarWrapper>
    </div>
  ),
);

const SidebarWrapper = pluginsLayout.sidebar('div');
const ToolbarWrapper = pluginsLayout.toolbar('div');
const HeaderWrapper = pluginsLayout.header('div');
const BreadcrumbsWrapper = pluginsLayout.breadcrumbs('div');
const OverflowWrapper = pluginsLayout.overflowWrapper(Panel);
const Content = pluginsLayout.content('div');
const Footer = pluginsLayout.footer('div');
const WithSidebarWrapper = pluginsLayout.withSidebarWrapper('div');
