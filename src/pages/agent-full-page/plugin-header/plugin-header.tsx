import { BEM, div } from '@redneckz/react-bem-helper';
import { useHistory, matchPath } from 'react-router-dom';
import { Panel, Spinner, Icons } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { capitalize } from 'utils';
import { AgentStatus } from 'types/agent-status';
import { ComponentPropsType } from 'types/component-props-type';
import { useAgent } from 'hooks';
import { usePluginState } from '../store';
import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './plugin-header.module.scss';

interface Props {
  className?: string;
  agentName?: string;
  agentStatus?: AgentStatus;
}

const pluginHeader = BEM(styles);

export const PluginHeader = pluginHeader(({ className, agentName, agentStatus }: Props) => {
  const { loading } = usePluginState();
  const { push, location: { pathname } } = useHistory();
  const { params: { buildVersion = '', agentId = '' } = {} } = matchPath<{ buildVersion: string; agentId: string }>(pathname, {
    path: '/:page/:agentId/:buildVersion',
  }) || {};
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};

  return (
    <div className={className}>
      <Content>
        <Panel>
          <LogoWrapper recording={buildVersion === activeBuildVersion && loading}>
            <Logo />
          </LogoWrapper>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <Panel>
              <AgentStatusWrapper status={agentStatus}>{capitalize(agentStatus)}</AgentStatusWrapper>
              <SpinnerWrapper>{agentStatus === AGENT_STATUS.BUSY && <Spinner />}</SpinnerWrapper>
            </Panel>
          </AgentInfo>
        </Panel>
        <SettingsButton
          onClick={() => push(`/agents/agent/${agentId}/settings`)}
          disabled={agentStatus === AGENT_STATUS.OFFLINE}
          data-test="plugin-header:settings-button"
        />
      </Content>
    </div>
  );
});

const Content = pluginHeader.content('div');
const LogoWrapper = pluginHeader.logoWrapper(div({} as { recording?: boolean }));
const Logo = pluginHeader.logo(LogoSvg);
const AgentInfo = pluginHeader.agentInfo('div');
const AgentName = pluginHeader.agentName('div');
const AgentStatusWrapper = pluginHeader.agentStatusWrapper(div({} as { status?: AgentStatus }));
const SpinnerWrapper = pluginHeader.spinnerWrapper(Panel);
const SettingsButton: React.FC<ComponentPropsType<typeof Icons.Settings> & { disabled?: boolean }>
  = pluginHeader.settingsButton(Icons.Settings);
