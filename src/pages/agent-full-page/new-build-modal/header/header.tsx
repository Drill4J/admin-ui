import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './header.module.scss';

interface Props {
  className?: string;
  prevBuildVersion?: string;
}

const header = BEM(styles);

export const Header = header(
  ({ className, prevBuildVersion }: Props) => (
    <div className={className}>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Content>
        <Title>New Build has Arrived!</Title>
        <PrevBuildInfo>
          Previous build:&nbsp;
          <PrevBuildVersion>{prevBuildVersion}</PrevBuildVersion>
        </PrevBuildInfo>
      </Content>
    </div>
  ),
);

const LogoWrapper = header.logoWrapper('div');
const Logo = header.logo(LogoSvg);
const Content = header.content('div');
const Title = header.title('div');
const PrevBuildInfo = header.prevBuildInfo(Panel);
const PrevBuildVersion = header.prevBuildVersion('span');
