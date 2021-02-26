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
import { useParams, useHistory } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

import { ServiceGroupSummary } from 'types/service-group-summary';
import { ReactComponent as LogoSvg } from './service-group-logo.svg';

import styles from './service-group-header.module.scss';

interface Props {
  className?: string;
  serviceGroup?: ServiceGroupSummary;
}

const serviceGroupHeader = BEM(styles);

export const ServiceGroupHeader = serviceGroupHeader(
  ({
    className,
    serviceGroup: { name, summaries = [] } = {},
  }: Props) => {
    const { id = '' } = useParams<{ id: string }>();
    const { push } = useHistory();

    return (
      <div className={className}>
        <Logo />
        <Content>
          <AgentInfo>
            <ServiceGroupName>{name}</ServiceGroupName>
            <AgentsCountInfo>
              Agents&nbsp;<AgentsCount>{summaries.length}</AgentsCount>
            </AgentsCountInfo>
          </AgentInfo>
          <div className="link">
            <Icons.Settings
              width={32}
              height={32}
              onClick={() => push(`/agents/service-group/${id}/settings`)}
              data-test="service-group-header:settings-button"
            />
          </div>
        </Content>
      </div>
    );
  },
);

const Logo = serviceGroupHeader.logo(LogoSvg);
const Content = serviceGroupHeader.content('div');
const AgentInfo = serviceGroupHeader.agentInfo('div');
const ServiceGroupName = serviceGroupHeader.serviceGroupName('div');
const AgentsCountInfo = serviceGroupHeader.agentsCountInfo('div');
const AgentsCount = serviceGroupHeader.agentsCount('span');
