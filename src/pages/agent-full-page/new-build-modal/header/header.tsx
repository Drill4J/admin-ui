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
