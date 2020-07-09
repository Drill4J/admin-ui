import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Icons, CancelButton, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  PageHeader, Wizard, Step,
} from 'components';
import { useWsConnection } from 'hooks';
import { CancelAgentRegistrationModal, SystemSettingsStep, InstallPluginsStep } from 'modules';
import { composeValidators, requiredArray, sizeLimit } from 'forms';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import { Agent } from 'types/agent';
import { registerAgent } from './register-service-group';

import styles from './service-group-registration-page.module.scss';

interface Props {
  className?: string;
}

const serviceGroupRegistrationPage = BEM(styles);

export const ServiceGroupRegistrationPage = serviceGroupRegistrationPage(
  ({
    className,
  }: Props) => {
    const { push } = useHistory();
    const { serviceGroupId = '' } = useParams();
    const [isCancelModalOpened, setIsCancelModalOpened] = React.useState(false);
    const { showMessage } = React.useContext(NotificationManagerContext);
    const serviceGroup = useWsConnection<Agent>(defaultAdminSocket, `/service-groups/${serviceGroupId}`) || {};
    const handleRegisterAgent = registerAgent({
      onSuccess: () => {
        showMessage({ type: 'SUCCESS', text: 'Multiple agents registration has been finished.' });
        push(`/service-group-full-page/${serviceGroupId}/service-group-dashboard`);
      },
    });

    return (
      <div className={className}>
        <PageHeader
          title={(
            <Panel>
              <HeaderIcon height={20} width={20} />
              Register new agent
            </Panel>
          )}
          actions={(
            <Panel align="end">
              <CancelButton size="large" onClick={() => setIsCancelModalOpened(true)}>
                Cancel
              </CancelButton>
            </Panel>
          )}
        />
        <Wizard
          initialValues={serviceGroup}
          onSubmit={handleRegisterAgent}
        >
          <Step
            name="System settings"
            component={() => (
              <SystemSettingsStep infoPanel={(
                <GeneralAlerts type="INFO">
                  Provide information related to your application / project
                </GeneralAlerts>
              )}
              />
            )}
            validate={composeValidators(
              requiredArray('packages', 'Package prefixes'),
              sizeLimit({
                name: 'sessionIdHeaderName',
                alias: 'Session header name',
                min: 1,
                max: 256,
              }),
            )}
          />
          <Step
            name="Plugins"
            component={() => (
              <InstallPluginsStep infoPanel={(
                <GeneralAlerts type="INFO">
                  Choose plugins to install on your agents.
                  You will be able to change configuration of any agent separately on Agent Settings page.
                </GeneralAlerts>
              )}
              />
            )}
          />
        </Wizard>
        {isCancelModalOpened && (
          <CancelAgentRegistrationModal
            isOpen={isCancelModalOpened}
            onToggle={setIsCancelModalOpened}
          />
        )}
      </div>
    );
  },
);

const HeaderIcon = serviceGroupRegistrationPage.headerIcon(Icons.Register);
