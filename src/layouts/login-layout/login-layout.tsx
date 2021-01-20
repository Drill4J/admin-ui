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

import { ReactComponent as LoginLogo } from './logo.svg';

import styles from './login-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const loginLayout = BEM(styles);

export const LoginLayout = loginLayout(({ className, children }: Props) => (
  <div className={className}>
    <SideBar>{children}</SideBar>
    <LogoWrapper>
      <LoginLogo />
    </LogoWrapper>
  </div>
));

const SideBar = loginLayout.sidebar('div');
const LogoWrapper = loginLayout.logoWrapper('div');
