import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import { Panel, Icons, Menu } from '@drill4j/ui-kit';

import { toggleAgent } from 'api';
import { useCommonEntity } from 'hooks';
import { PageHeader } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { NotificationManagerContext } from 'notification-manager';
import { Agent } from 'types/agent';
import { UnregisterAgentModal } from './unregister-agent-modal';
import { AgentStatusToggler } from '../agents-page/agent-status-toggler';
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
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [isUnregisterModalOpen, setIsUnregisterModalOpen] = React.useState(false);

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
                  <AgentStatus
                    status={(data as Agent).status}
                    onChange={() => toggleAgent(data.id, (data as Agent).status, showMessage)}
                  />
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
        {(type as string) === 'service-group' ? (
          <ServiceGroupSettings showMessage={showMessage} serviceGroup={data} />
        ) : (
          <AgentSettings showMessage={showMessage} agent={data} />
        )}
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
const AgentStatus = settingsPage.agentStatus(AgentStatusToggler);
