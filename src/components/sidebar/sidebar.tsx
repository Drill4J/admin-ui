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
import { BEM, div } from '@redneckz/react-bem-helper';
import { useHistory, useLocation, matchPath } from 'react-router-dom';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './sidebar.module.scss';

interface IconProps {
  width?: number;
  height?: number;
  onClick?: () => void;
  viewBox?: string;
  rotate?: number;
  'data-test'?: string;
}

interface Props {
  className?: string;
  active?: 'active';
  links: Array<{ icon: React.ComponentType<IconProps>; link: string; computedLink?: string }>;
  matchParams: { path: string };
}

const sidebar = BEM(styles);

export const Sidebar = sidebar(({
  className, links, matchParams,
}: Props) => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { params: { activeLink = '' } = {} } = matchPath<{ activeLink: string }>(pathname, matchParams) || {};

  return (
    <div className={className}>
      <Logo onClick={() => push('/')}>
        <LogoSvg />
      </Logo>
      {links.length > 0
          && links.map(({ icon: Icon, link, computedLink }) => (
            <SidebarLink
              key={link}
              type={link === activeLink ? 'active' : ''}
              onClick={() => push(`/${computedLink || link}`)}
            >
              <Icon />
            </SidebarLink>
          ))}
    </div>
  );
});

const Logo = sidebar.logo('div');
export const SidebarLink = sidebar.link(
  div({ active: undefined, onClick: () => {}, long: undefined } as {
    active?: boolean;
    onClick: () => void;
    long?: boolean;
  }),
);
