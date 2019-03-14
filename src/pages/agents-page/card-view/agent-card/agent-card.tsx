import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons, Toggler } from '../../../../components';
import { Agent } from '../../agent-types';

import styles from './agent-card.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

const agentCard = BEM(styles);

export const AgentCard = agentCard(({ className, agent: { name, description } }: Props) => (
  <div className={className}>
    <Header>
      {name}
      <HeaderIconsWrapper>
        <Icons.Settings height={16} width={16} />
        <Icons.NewWindow />
      </HeaderIconsWrapper>
    </Header>
    <DrillStatus>
      <Toggler label="DRILL4J ON" />
    </DrillStatus>
    <Description>{description}</Description>
  </div>
));

const Header = agentCard.header('div');
const HeaderIconsWrapper = agentCard.headerIconsWrapper('div');
const DrillStatus = agentCard.drillStatus('div');
const Description = agentCard.desctiption('div');
