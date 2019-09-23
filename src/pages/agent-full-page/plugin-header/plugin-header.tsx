import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(({ className, agentName }: Props) => {
  return (
    <div className={className}>
      <Content>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <AgentInfo>
          <AgentName>{agentName}</AgentName>
        </AgentInfo>
      </Content>
    </div>
  );
});

const Content = pluginHeader.content('div');
const LogoWrapper = pluginHeader.logoWrapper('div');
const Logo = pluginHeader.logo(LogoSvg);
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
