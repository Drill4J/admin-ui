/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
