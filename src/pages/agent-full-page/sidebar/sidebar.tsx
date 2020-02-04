import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { Icons } from 'components';

import styles from './sidebar.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
  active?: 'active';
  links: Array<{
    id: string;
    icon: keyof typeof Icons;
    link: string;
    computed?: boolean;
  }>;
  matchParams: { path: string };
}

const sidebar = BEM(styles);

export const Sidebar = withRouter(
  sidebar(
    ({
      className,
      links,
      history: { push },
      location: { pathname },
      matchParams,
      match: {
        params: { agentId },
      },
    }: Props) => {
      const { params: { buildVersion = '', activeLink = '' } = {} } =
        matchPath<{ buildVersion: string; activeLink: string }>(pathname, matchParams) || {};

      return (
        <div className={className}>
          {links.map(({
            id, icon, link, computed,
          }) => {
            const Icon = Icons[icon] || Icons.Plugins;
            return (
              <SidebarLink
                key={link}
                type={id === activeLink ? 'active' : ''}
                onClick={() => push(`/${computed ? `full-page/${agentId}/${buildVersion}/${link}` : link}`)}
              >
                <Icon />
              </SidebarLink>
            );
          })}
        </div>
      );
    },
  ),
);

export const SidebarLink = sidebar.link(
  div({ active: undefined, onClick: () => {}, long: undefined } as {
    active?: boolean;
    onClick: () => void;
    long?: boolean;
  }),
);
