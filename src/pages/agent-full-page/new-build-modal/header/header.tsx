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
import { Panel } from '@drill4j/ui-kit';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './header.module.scss';

interface Props {
  className?: string;
  baselineBuild?: string;
}

const header = BEM(styles);

export const Header = header(
  ({ className, baselineBuild }: Props) => (
    <div className={className}>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Content>
        <Title>New Build has Arrived!</Title>
        <BaselineBuildInfo>
          Baseline build:&nbsp;
          <BaselineBuild>{baselineBuild}</BaselineBuild>
        </BaselineBuildInfo>
      </Content>
    </div>
  ),
);

const LogoWrapper = header.logoWrapper('div');
const Logo = header.logo(LogoSvg);
const Content = header.content('div');
const Title = header.title('div');
const BaselineBuildInfo = header.baselineBuildInfo(Panel);
const BaselineBuild = header.baselineBuild('span');
