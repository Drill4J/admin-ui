import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './plugins-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  header?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

const pluginsLayout = BEM(styles);

export const PluginsLayout = pluginsLayout(
  ({ className, toolbar, header, breadcrumbs, children }: Props) => (
    <div className={className}>
      <ToolbarWrapper>{toolbar}</ToolbarWrapper>
      <HeaderWrapper>{header}</HeaderWrapper>
      <BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>
      <Content>{children}</Content>
    </div>
  ),
);

const ToolbarWrapper = pluginsLayout.toolbar('div');
const HeaderWrapper = pluginsLayout.header('div');
const BreadcrumbsWrapper = pluginsLayout.breadcrumbs('div');
const Content = pluginsLayout.content('div');
