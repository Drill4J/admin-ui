/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BEM } from '@redneckz/react-bem-helper';

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
        <OverflowWrapper className="flex items-start flex-col w-full">
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
const OverflowWrapper = pluginsLayout.overflowWrapper('div');
const Content = pluginsLayout.content('div');
const Footer = pluginsLayout.footer('div');
const WithSidebarWrapper = pluginsLayout.withSidebarWrapper('div');
