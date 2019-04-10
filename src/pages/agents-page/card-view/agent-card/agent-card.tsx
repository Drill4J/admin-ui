import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import { Icons, Toggler } from '../../../../components';
import { Agent } from '../../../../types/agent';

import styles from './agent-card.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agent: Agent;
  selected?: boolean;
  onSelect: () => void;
}

const agentCard = BEM(styles);

export const AgentCard = withRouter(
  agentCard(
    ({
      className,
      agent: { name, description, status, activePluginsCount, pluginsCount, id },
      onSelect,
      history: { push },
    }: Props) => (
      <div className={className} onClick={onSelect}>
        <Header>
          <HeaderName
            onClick={() => {
              push(`/agents/${id}`);
            }}
          >
            {name}
          </HeaderName>
          <HeaderIconsWrapper>
            <Icons.Settings height={16} width={16} />
            <Icons.NewWindow onClick={() => push(`/full-page/${id}/coverage`)} />
          </HeaderIconsWrapper>
        </Header>
        <DrillStatus>
          <Toggler
            value={status}
            label={`DRILL4J ${status ? 'ON' : 'OFF'}`}
            onChange={() => {
              if (id) {
                toggleStandby(id);
              }
            }}
          />
          {status && (
            <ActivePlugins>{`(${activePluginsCount} of ${pluginsCount} plugins on)`}</ActivePlugins>
          )}
        </DrillStatus>
        <Description>{description}</Description>
      </div>
    ),
  ),
);

const Header = agentCard.header('div');
const HeaderName = agentCard.headerName('div');
const HeaderIconsWrapper = agentCard.headerIconsWrapper('div');
const DrillStatus = agentCard.drillStatus('div');
const ActivePlugins = agentCard.activePlugins('div');
const Description = agentCard.desctiption('div');

const toggleStandby = (agentId: string) => {
  axios.post(`/agents/${agentId}/toggle-standby`);
};
