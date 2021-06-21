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
import {
  useLocation, matchPath, Link,
} from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { ReactComponent as LogoSvg } from './logo.svg';

interface IconProps {
  width?: number;
  height?: number;
  onClick?: () => void;
  viewBox?: string;
  rotate?: number;
  'data-test'?: string;
}

interface Props {
  active?: 'active';
  links: Array<{ icon: React.ComponentType<IconProps>; link: string; computedLink?: string }>;
  matchParams: { path: string };
}

export const Sidebar = ({ links, matchParams }: Props) => {
  const { pathname } = useLocation();
  const { params: { activeLink = '' } = {} } = matchPath<{ activeLink: string }>(pathname, matchParams) || {};

  return (
    <div tw="w-20 h-full bg-monochrome-light-tint">
      <Link
        tw="flex justify-center items-center w-full h-20 cursor-pointer border-b border-monochrome-medium-tint"
        to="/"
      >
        <LogoSvg />
      </Link>
      {links.length > 0
          && links.map(({ icon: Icon, link, computedLink }) => (
            <SidebarLink
              key={link}
              isActive={link === activeLink}
              to={`/${computedLink || link}`}
            >
              <Icon />
            </SidebarLink>
          ))}
    </div>
  );
};

export const SidebarLink = styled(Link)`
  ${tw`flex justify-center items-center w-full h-20`}
  ${tw`border-b border-monochrome-medium-tint text-monochrome-default cursor-pointer`}
  ${tw`hover:border-blue-default hover:text-blue-default`}
  
  ${({ isActive }: { isActive: boolean }) => isActive && tw`text-blue-default bg-monochrome-white`}
`;
