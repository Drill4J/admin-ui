import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import {
  Panel, Icons, Button, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  PageHeader, Wizard, Step,
} from 'components';
import {
  requiredArray, composeValidators, required, sizeLimit,
} from 'forms';
import { useAgent } from 'hooks';
import { NotificationManagerContext } from 'notification-manager';
import { CancelAgentRegistrationModal, InstallPluginsStep, SystemSettingsStep } from 'modules';
import { GeneralSettingsForm } from './general-settings-form';

import { registerAgent } from './register-agent';

import styles from './agent-registration-page.module.scss';

interface Props {
  className?: string;
}

const agentRegistrationPage = BEM(styles);

export const AgentRegistrationPage = agentRegistrationPage(
  ({
    className,
  }: Props) => {
    const { agentId = '' } = useParams();
    const { push } = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { buildVersion = '', plugins = [], ...agent } = useAgent(agentId) || {};
    const [isCancelModalOpened, setIsCancelModalOpened] = React.useState(false);
    const { showMessage } = React.useContext(NotificationManagerContext);
    return (
      <div className={className}>
        <PageHeader
          title={(
            <Panel>
              <HeaderIcon height={20} width={20} />
              Register New Agent
            </Panel>
          )}
          actions={(
            <Panel align="end">
              <Button type="secondary" size="large" onClick={() => setIsCancelModalOpened(true)}>
                Abort Registration
              </Button>
            </Panel>
          )}
        />
        <Wizard
          initialValues={agent}
          onSubmit={registerAgent(() => {
            showMessage({ type: 'SUCCESS', text: 'Agent has been registered' });
            push(`/full-page/${agentId}/${buildVersion}/dashboard`);
          })}
        >
          <Step
            name="General Settings"
            component={GeneralSettingsForm}
            validate={composeValidators(
              required('name'),
              sizeLimit({ name: 'name' }),
              sizeLimit({ name: 'environment' }),
              sizeLimit({ name: 'description', min: 3, max: 256 }),
            )}
          />
          <Step
            name="System settings"
            component={() => (
              <SystemSettingsStep infoPanel={(
                <GeneralAlerts type="INFO">
                  Provide information related to your application / project.
                </GeneralAlerts>
              )}
              />
            )}
            validate={composeValidators(
              requiredArray('packages', 'Package prefixes are required.'),
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
            component={({ formValues }) => (
              <InstallPluginsStep
                formValues={formValues}
                infoPanel={(
                  <GeneralAlerts type="INFO">
                    Choose plugins to install on your agent. You will also be able to add them later on Agent’s page.
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

const HeaderIcon = agentRegistrationPage.headerIcon(Icons.Register);
