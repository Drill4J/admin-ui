import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Link } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

import { camelToSpaces } from 'utils';

import styles from './no-plugins-stub.module.scss';

interface Props {
  className?: string;
  agentId?: string;
  agentType: 'Agent' | 'ServiceGroup';
}

const noPluginsStub = BEM(styles);

export const NoPluginsStub = noPluginsStub(({ className, agentId = '', agentType }: Props) => (
  <div className={className}>
    <Icon height={160} width={160} />
    <Title>No data available</Title>
    <Message>
      <div>There are no enabled plugins on this {camelToSpaces(agentType)} to collect the data from.</div>
      <div>To install a plugin go to</div>
    </Message>
    <AgentInfoLink to={`/agents/${agentType === 'Agent' ? 'agent' : 'service-group'}/${agentId}/settings`}>
      {camelToSpaces(agentType)} settings page
    </AgentInfoLink>
  </div>
));

const Icon = noPluginsStub.icon(Icons.Plugins);
const Title = noPluginsStub.title('div');
const Message = noPluginsStub.message('div');
const AgentInfoLink = noPluginsStub.link(Link);
