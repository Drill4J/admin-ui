import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './sidebar.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  active?: 'active';
  links: Array<{ icon: (props: any) => JSX.Element; link: string }>;
}

const sidebar = BEM(styles);

export const Sidebar = withRouter(
  sidebar(({ className, links, history: { push }, location: { pathname } }: Props) => {
    const { params: { activeLink = '' } = {} } =
      matchPath<{ activeLink: string }>(pathname, {
        path: '/:activeLink',
      }) || {};

    return (
      <div className={className}>
        <Logo>
          <LogoSvg />
        </Logo>
        {links.length > 0 &&
          links.map(({ icon: Icon, link }) => (
            <SidebarLink
              key={link}
              type={link === activeLink ? 'active' : ''}
              onClick={() => push(`/${link}`)}
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
  div({ active: undefined, onClick: () => {} } as { active?: boolean; onClick: () => void }),
);
