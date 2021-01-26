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
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import { Icons, Menu } from '@drill4j/ui-kit';

import { useCommonEntity } from 'hooks';
import { PageHeader } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { UnregisterAgentModal } from './unregister-agent-modal';
import { AgentStatusToggle } from '../agents-page/agent-status-toggle';
import { AgentSettings } from './agent-settings';
import { ServiceGroupSettings } from './service-group-settings';

import styles from './settings-page.module.scss';

interface Props {
  className?: string;
}

const settingsPage = BEM(styles);

export const SettingsPage = settingsPage(
  ({
    className,
  }: Props) => {
    const { id = '', type = '' } = useParams<{ id: string, type: string}>();
    const data = useCommonEntity(id, type) || {};
    const [isUnregisterModalOpen, setIsUnregisterModalOpen] = useState(false);

    return (
      <div className={className}>
        <PageHeader
          title={(
            <div className="d-flex align-items-center w-100">
              <HeaderIcon height={24} width={24} />
              {(type as string) === 'service-group' ? (
                'Service Group Settings'
              ) : (
                <>
                  Agent Settings
                  <AgentStatus agent={(data as Agent)} />
                </>
              )}
            </div>
          )}
          actions={
            (type as string) !== 'service-group' && (
              <div className="d-flex justify-content-end align-items-center w-100">
                {(data as Agent).status !== AGENT_STATUS.NOT_REGISTERED && (
                  <Menu
                    bordered
                    items={[
                      {
                        label: 'Unregister',
                        icon: 'Unregister',
                        onClick: () => {
                          setIsUnregisterModalOpen(true);
                        },
                      },
                    ]}
                  />
                )}
              </div>
            )
          }
        />
        {type === 'service-group' ? <ServiceGroupSettings serviceGroup={data} /> : <AgentSettings agent={data} />}
        {isUnregisterModalOpen && (
          <UnregisterAgentModal
            isOpen={isUnregisterModalOpen}
            onToggle={setIsUnregisterModalOpen}
            agentId={id}
          />
        )}
      </div>
    );
  },
);

const HeaderIcon = settingsPage.headerIcon(Icons.Settings);
const AgentStatus = settingsPage.agentStatus(AgentStatusToggle);
