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
import { Link } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { camelToSpaces } from 'utils';
import { Stub } from 'components';

interface Props {
  agentId?: string;
  agentType: 'Agent' | 'ServiceGroup';
}

const AgentInfoLink = styled(Link)`
  ${tw`block mt-1 text-14 font-bold text-blue-default no-underline`}
  :first-letter {
    text-transform: uppercase;
  }
`;

export const NoPluginsStub = ({ agentId = '', agentType }: Props) => (
  <Stub
    className="border-t border-monochrome-medium-tint"
    title={<span tw="text-24">No data available</span>}
    message={(
      <>
        <div tw="text-14 leading-20 text-center">
          <div>There are no enabled plugins on this {camelToSpaces(agentType)} to collect the data from.</div>
          <div>To install a plugin go to</div>
        </div>
        <AgentInfoLink to={`/agents/${agentType === 'Agent' ? 'agent' : 'service-group'}/${agentId}/settings/general`}>
          {camelToSpaces(agentType)} settings page
        </AgentInfoLink>
      </>
    )}
  >
    <Icons.Plugins tw="text-monochrome-default" height={160} width={160} />
  </Stub>
);
