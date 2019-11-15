import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './sidebar.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  active?: 'active';
  links: Array<{ icon: React.ComponentType<any>; link: string; computedLink?: string }>;
  matchParams: { path: string };
}

const sidebar = BEM(styles);

export const Sidebar = withRouter(
  sidebar(({ className, links, history: { push }, location: { pathname }, matchParams }: Props) => {
    const { params: { activeLink = '' } = {} } =
      matchPath<{ activeLink: string }>(pathname, matchParams) || {};

    return (
      <div className={className}>
        <Logo onClick={() => push('/')}>
          <LogoSvg />
        </Logo>
        {links.length > 0 &&
          links.map(({ icon: Icon, link, computedLink }) => (
            <SidebarLink
              key={link}
              type={link === activeLink ? 'active' : ''}
              onClick={() => push(`/${computedLink ? computedLink : link}`)}
              data-test={`sidebar:sidebar-link:${link}`}
            >
              <Icon />
            </SidebarLink>
          ))}
      </div>
    );
  }),
);

const Logo = sidebar.logo('div');
export const SidebarLink = sidebar.link(
  div({ active: undefined, onClick: () => {}, long: undefined, 'data-test': '' } as {
    active?: boolean;
    onClick: () => void;
    long?: boolean;
    'data-test'?: string;
  }),
);
