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
