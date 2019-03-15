import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { AgentCard } from './agent-card';
import { Agent } from '../agent-types';

import styles from './card-view.module.scss';

interface Props {
  className?: string;
  idKey: string;
  agents: Agent[];
  handleSelectAgents: (selectedId: string[]) => any;
  selectedAgents: string[];
}

const cardView = BEM(styles);

export const CardView = cardView(
  ({ className, idKey, agents, selectedAgents, handleSelectAgents }: Props) => (
    <div className={className}>
      {agents.map((agent: any) => (
        <AgentCard
          key={agent[idKey]}
          agent={agent}
          selected={selectedAgents.includes(String(agent.ipAddress))}
          onSelect={() => {
            selectedAgents.includes(agent[idKey])
              ? handleSelectAgents(
                  selectedAgents.filter((selectedItem) => selectedItem !== agent[idKey]),
                )
              : handleSelectAgents([...selectedAgents, agent[idKey]]);
          }}
        />
      ))}
    </div>
  ),
);
