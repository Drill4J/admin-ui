import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';
import { Sidebar } from './sidebar';

import styles from './with-sidebar.module.scss';

interface WithSidebarProps {
  className?: string;
  children?: React.ReactNode;
}

const withSidebarWrapper = BEM(styles);

const pluginsLinks = [
  {
    id: 'dashboard',
    link: 'dashboard',
    icon: Icons.Dashboard,
    computed: true,
  },
  {
    id: 'coverage',
    link: 'coverage/dashboard',
    icon: Icons.Coverage,
    computed: true,
  },
];

export function withSidebar<P extends {}>(Compoent: React.ComponentType<P>) {
  return withSidebarWrapper(({ className, children, ...props }: WithSidebarProps & P) => (
    <div className={className}>
      <SidebarWrapper>
        <Sidebar links={pluginsLinks} matchParams={{ path: '/full-page/:agentId/:activeLink' }} />
      </SidebarWrapper>
      <Content>
        <Compoent {...props as P} />
      </Content>
    </div>
  ));
}

const SidebarWrapper = withSidebarWrapper.sidebar('div');
const Content = withSidebarWrapper.content('div');
