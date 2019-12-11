import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { useSettingsTarget } from 'hooks';
import { PageHeader, Icons, Menu } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { NotificationManagerContext } from 'notification-manager';
import { UnregisterAgentModal } from './unregister-agent-modal';
import { toggleStandby } from './toggle-standby';
import { AgentStatusToggler } from '../agents-page/agent-status-toggler';
import { AgentSettings } from './agent-settings';
import { ServiceGroupSettings } from './service-group-settings';
import { Agent } from 'types/agent';

import styles from './settings-page.module.scss';

interface Props extends RouteComponentProps<{ id: string; type: string }> {
  className?: string;
}

const settingsPage = BEM(styles);

export const SettingsPage = withRouter(
  settingsPage(
    ({
      className,
      match: {
        params: { id, type },
      },
    }: Props) => {
      const data = useSettingsTarget(id, type) || {};
      const { showMessage } = React.useContext(NotificationManagerContext);
      const [errorMessage, setErrorMessage] = React.useState('');
      const [isUnregisterModalOpen, setIsUnregisterModalOpen] = React.useState(false);
      return (
        <div className={className}>
          <PageHeader
            title={
              <Panel>
                <HeaderIcon height={24} width={24} />
                {type === 'service-group' ? (
                  `Service Group Agent settings`
                ) : (
                  <>
                    Agent settings
                    <AgentStatus
                      status={(data as Agent).status}
                      onChange={() => toggleStandby((data as Agent).id || '', setErrorMessage)}
                    />
                  </>
                )}
              </Panel>
            }
            actions={
              type !== 'service-group' && (
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
          {errorMessage && (
            <ErrorMessage>
              <ErrorMessageIcon />
              {errorMessage}
            </ErrorMessage>
          )}
          {type === 'service-group' ? (
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
  ),
);

const HeaderIcon = settingsPage.headerIcon(Icons.Settings);
const AgentStatus = settingsPage.agentStatus(AgentStatusToggler);
const ErrorMessage = settingsPage.errorMessage(Panel);
const ErrorMessageIcon = settingsPage.errorMessageIcon(Icons.Warning);
