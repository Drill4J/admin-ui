import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import { Panel, Icons, Menu } from '@drill4j/ui-kit';

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
            <Panel>
              <HeaderIcon height={24} width={24} />
              {(type as string) === 'service-group' ? (
                'Service Group Settings'
              ) : (
                <>
                  Agent Settings
                  <AgentStatus agent={(data as Agent)} />
                </>
              )}
            </Panel>
          )}
          actions={
            (type as string) !== 'service-group' && (
              <Panel align="end">
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
              </Panel>
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
