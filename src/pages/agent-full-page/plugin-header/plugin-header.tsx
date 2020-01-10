import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Spinner } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { capitalize } from 'utils';
import { usePluginState } from '../store';
import { ReactComponent as LogoSvg } from './logo.svg';
import { AgentStatus } from 'types/agent-status';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentStatus?: AgentStatus;
  agentIPAddress?: string;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(
  ({ className, agentName, agentStatus, agentIPAddress }: Props) => {
    const { loading } = usePluginState();
    return (
      <div className={className}>
        <Content>
          <LogoWrapper recording={loading}>
            <Logo />
          </LogoWrapper>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <Panel>
              <AgentIpAddress>{agentIPAddress}</AgentIpAddress>
              <AgentStatusWrapper status={agentStatus}>
                {capitalize(agentStatus)}
              </AgentStatusWrapper>
              <SpinnerWrapper>{agentStatus === AGENT_STATUS.BUSY && <Spinner />}</SpinnerWrapper>
            </Panel>
          </AgentInfo>
        </Content>
      </div>
    );
  },
);

const Content = pluginHeader.content('div');
const LogoWrapper = pluginHeader.logoWrapper(div({} as { recording?: boolean }));
const Logo = pluginHeader.logo(LogoSvg);
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
const AgentIpAddress = pluginHeader.agentIpAddress('div');
const AgentStatusWrapper = pluginHeader.agentStatusWrapper(
  div(
    {} as {
      status?: AgentStatus;
    },
  ),
);
const SpinnerWrapper = pluginHeader.spinnerWrapper(Panel);
