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

import styles from './app-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}

const appLayout = BEM(styles);

export const AppLayout = appLayout(({
  className, toolbar, sidebar, children, footer,
}: Props) => (
  <div className={className}>
    <SidebarWrapper>{sidebar}</SidebarWrapper>
    <ContentWrapper>
      <HeaderWrapper>{toolbar}</HeaderWrapper>
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </ContentWrapper>
  </div>
));

const SidebarWrapper = appLayout.sidebar('div');
const ContentWrapper = appLayout.contentWrapper('div');
const HeaderWrapper = appLayout.header('div');
const Content = appLayout.content('div');
const Footer = appLayout.footer('div');
