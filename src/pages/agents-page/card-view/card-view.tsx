import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { AgentCard } from './agent-card';
import { AGENT_STATUS } from '../../../common/constants';
import { Agent } from '../../../types/agent';

import styles from './card-view.module.scss';

interface Props {
  className?: string;
  idKey: keyof Agent;
  agents: Agent[];
  handleSelectAgents: (selectedId: string[]) => any;
  selectedAgents: string[];
}

const cardView = BEM(styles);

export const CardView = cardView(
  ({ className, idKey, agents, selectedAgents, handleSelectAgents }: Props) => (
    <div className={className}>
      {agents.map((agent) => {
        const selected = selectedAgents.includes(String(agent.id));
        return (
          <AgentCard
            key={String(agent[idKey])}
            agent={agent}
            selected={selected}
            onSelect={() => {
              selectedAgents.includes(String(agent[idKey]))
                ? handleSelectAgents(
                    selectedAgents.filter((selectedItem) => selectedItem !== agent[idKey]),
                  )
                : handleSelectAgents([...selectedAgents, String(agent[idKey])]);
            }}
            disabled={agent.status !== AGENT_STATUS.READY && !selected}
          />
        );
      })}
    </div>
  ),
);
