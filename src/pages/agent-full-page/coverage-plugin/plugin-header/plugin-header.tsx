import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Inputs } from '../../../../forms';
import { useWsConnection } from '../../../../hooks';
import { defaultAdminSocket } from '../../../../common/connection';
import { ReactComponent as Logo } from './logo.svg';
import { AgentBuildVersion } from '../../../../types/agent-build-version';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentId?: string;
  buildVersion: { value: string; label: string };
  setBuildVersion: (version: { value: string; label: string }) => void;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(
  ({ className, agentId, agentName, buildVersion, setBuildVersion }: Props) => {
    const agentBuildVersions =
      useWsConnection<AgentBuildVersion[]>(defaultAdminSocket, `/agent/${agentId}/get-builds`) ||
      [];

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
              onChange={({ value, label }: { value: string; label: string }) => {
                setBuildVersion({
                  value,
                  label: `Build ${label}`,
                });
              }}
            />
          </AgentInfo>
        </Content>
      </div>
    );
  },
);

const Content = pluginHeader.content('div');
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
