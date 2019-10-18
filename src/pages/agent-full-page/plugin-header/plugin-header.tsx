import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from '../../../layouts';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
  agentStatus?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY';
  agentIPAddress?: string;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(
  ({ className, agentName, agentStatus, agentIPAddress }: Props) => {
    console.log(agentStatus);

    return (
      <div className={className}>
        <Content>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <Panel>
              <AgentIpAddress>{agentIPAddress}</AgentIpAddress>
              <AgentStatus status={agentStatus}>
                {agentStatus === 'ONLINE' ? 'Online' : 'Offline'}
              </AgentStatus>
            </Panel>
          </AgentInfo>
        </Content>
      </div>
    );
  },
);

const Content = pluginHeader.content('div');
const LogoWrapper = pluginHeader.logoWrapper('div');
const Logo = pluginHeader.logo(LogoSvg);
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
const AgentIpAddress = pluginHeader.agentIpAddress('div');
const AgentStatus = pluginHeader.agentStatus(
  div({} as {
    status?: 'ONLINE' | 'NOT_REGISTERED' | 'BUSY';
  }),
);
