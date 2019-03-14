import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { AgentCard } from './agent-card';
import { Agent } from '../agent-types';

import styles from './card-view.module.scss';

interface Props {
  className?: string;
  agents: Agent[];
}

const cardView = BEM(styles);

export const CardView = cardView(({ className, agents }: Props) => (
  <div className={className}>
    {agents.map(({ name, isEnable, description }) => (
      <AgentCard name={name} isActive={isEnable} description={description} />
    ))}
  </div>
));
