import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link } from 'react-router-dom';

import { Icons } from '../../../../components';
import { Agent } from '../../../../types/agent';

import styles from './no-plugins-stub.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

const noPluginsStub = BEM(styles);

export const NoPluginsStub = noPluginsStub(({ className, agent = {} }: Props) => (
  <div className={className}>
    <Icon height={164} width={164} />
    <Title>No data available</Title>
    <Message>
      <div>There are no enabled plugins on this agent to collect the data from.</div>
      <div>
        To enable or install a plugin,{' '}
        <AgentInfoLink to={`/agents/${agent.id}`}>
          go back to Agent administration page.
        </AgentInfoLink>
      </div>
    </Message>
  </div>
));

const Icon = noPluginsStub.icon(Icons.Plugins);
const Title = noPluginsStub.title('div');
const Message = noPluginsStub.message('div');
const AgentInfoLink = noPluginsStub.link(Link);
