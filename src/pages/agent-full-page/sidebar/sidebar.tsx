import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  useParams, useHistory, useLocation, matchPath,
} from 'react-router-dom';
import { Icons, Tooltip } from '@drill4j/ui-kit';

import styles from './sidebar.module.scss';

interface Props {
  className?: string;
  active?: 'active';
  links: Array<{
    id: string;
    name: keyof typeof Icons;
    link: string;
    computed?: boolean;
  }>;
  matchParams: { path: string };
}

const sidebar = BEM(styles);

export const Sidebar = sidebar(
  ({
    className,
    links,
    matchParams,
  }: Props) => {
    const { agentId } = useParams<{ agentId: string }>();
    const { pathname } = useLocation();
    const { push } = useHistory();
    const { params: { buildVersion = '', activeLink = '' } = {} } =
      matchPath<{ buildVersion: string; activeLink: string }>(pathname, matchParams) || {};

    return (
      <div className={className}>
        {links.map(({
          id, name, link, computed,
        }) => {
          const Icon = Icons[name] || Icons.Plugins;
          return (
            <Tooltip message={<div>{name}</div>} position="right" key={link}>
              <SidebarLink
                type={id === activeLink ? 'active' : ''}
                onClick={() => push(`/${computed ? `full-page/${agentId}/${buildVersion}/${link}` : link}`)}
              >
                <Icon />
              </SidebarLink>
            </Tooltip>
          );
        })}
      </div>
    );
  },
);

export const SidebarLink = sidebar.link(
  div({ active: undefined, onClick: () => {}, long: undefined } as {
    active?: boolean;
    onClick: () => void;
    long?: boolean;
  }),
);
