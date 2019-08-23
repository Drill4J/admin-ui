import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Inputs } from '../../../../forms';
import { ReactComponent as Logo } from './logo.svg';
import { usePluginState, usePluginDispatch, setBuildVersion } from '../store';
import { useAgentId } from './use-agent-id';
import { AgentBuildVersion } from '../../../../types/agent-build-version';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(({ className, agentName }: Props) => {
  const { buildVersion } = usePluginState();
  const dispatch = usePluginDispatch();

  const agentBuildVersions = useAgentId<AgentBuildVersion[]>('get-builds') || [];
  return (
    <div className={className}>
      <Content>
        <Logo />
        <AgentInfo>
          <AgentName>{agentName}</AgentName>
          <Inputs.Dropdown
            value={buildVersion}
            items={agentBuildVersions.map(({ id = '', name = '' }) => ({
              value: id,
              label: name || id,
            }))}
            onChange={({ value }) => {
              dispatch(setBuildVersion(value));
            }}
          />
        </AgentInfo>
      </Content>
    </div>
  );
});

const Content = pluginHeader.content('div');
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
