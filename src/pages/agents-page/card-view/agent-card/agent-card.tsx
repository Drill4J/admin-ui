import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { Panel } from '../../../../layouts';
import { Icons } from '../../../../components';
import { Inputs, Button } from '../../../../forms';
import { Agent } from '../../../../types/agent';
import { AGENT_STATUS } from '../../../../common/constants';
import { RegisterAgentModal } from '../../register-agent-modal';

import styles from './agent-card.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agent: Agent;
  selected?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const agentCard = BEM(styles);

export const AgentCard = withRouter(
  agentCard(
    ({
      className,
      agent: { name, description, status, activePluginsCount, pluginsCount, id = '' },
      onSelect,
      history: { push },
    }: Props) => {
      const [isModalOpen, setIsModalOpen] = React.useState(false);

      return (
        <div className={className} onClick={onSelect}>
          <Header>
            <HeaderName
              onClick={() => {
                push(`/agents/${id}`);
              }}
            >
              {name || id}
            </HeaderName>
            {status !== AGENT_STATUS.NOT_REGISTERED && (
              <HeaderIconsWrapper>
                <Icons.OpenLive onClick={() => push(`/full-page/${id}/coverage/dashboard`)} />
                <Icons.Settings
                  height={16}
                  width={16}
                  onClick={() => push(`/agents/${id}/settings`)}
                />
              </HeaderIconsWrapper>
            )}
          </Header>
          <DrillStatus>
            <Inputs.Toggler
              value={status === AGENT_STATUS.READY}
              label={`DRILL4J ${status === AGENT_STATUS.READY ? 'ON' : 'OFF'}`}
              onChange={() => {
                if (id) {
                  toggleStandby(id);
                }
              }}
            />
            {status === AGENT_STATUS.READY && (
              <ActivePlugins>{`(${activePluginsCount} of ${pluginsCount} plugins on)`}</ActivePlugins>
            )}
          </DrillStatus>
          {status === AGENT_STATUS.NOT_REGISTERED ? (
            <RegisterButton type="primary" onClick={() => setIsModalOpen(true)}>
              <Panel align="center">
                <RegisterIcon />
                Register
              </Panel>
            </RegisterButton>
          ) : (
            <Description>{description}</Description>
          )}
          {isModalOpen && (
            <RegisterAgentModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={id} />
          )}
        </div>
      );
    },
  ),
);

const Header = agentCard.header('div');
const HeaderName = agentCard.headerName('div');
const HeaderIconsWrapper = agentCard.headerIconsWrapper('div');
const DrillStatus = agentCard.drillStatus('div');
const ActivePlugins = agentCard.activePlugins('div');
const RegisterButton = agentCard.registerAgent(Button);
const RegisterIcon = agentCard.registerIcon(Icons.Register);
const Description = agentCard.desctiption('div');

const toggleStandby = (agentId: string) => {
  axios.post(`/agents/${agentId}/toggle-standby`);
};
