import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { PageHeader, Icons, Wizard, Step } from 'components';
import { Panel } from 'layouts';
import { Button, requiredArray, composeValidators, required, sizeLimit } from 'forms';
import { useAgent } from 'hooks';
import { GeneralSettingsForm } from './general-settings-form';
import { SystemSettingsForm } from './system-setting-form';
import { CancelAgentRegistrationModal } from './cancel-agent-registration-modal';
import { InstallPluginsStep } from './install-plugins-step';
import { registerAgent } from './register-agent';
import { NotificationManagerContext } from 'notification-manager';

import styles from './agent-registration-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentRegistrationPage = BEM(styles);

export const AgentRegistrationPage = withRouter(
  agentRegistrationPage(
    ({
      className,
      match: {
        params: { agentId },
      },
      history: { push },
    }: Props) => {
      // eslint-disable-next-line
      const { buildVersion = '', plugins = [], ...agent } = useAgent(agentId) || {};
      const [isCancelModalOpened, setIsCancelModalOpened] = React.useState(false);
      const { showMessage } = React.useContext(NotificationManagerContext);
      return (
        <div className={className}>
          <PageHeader
            title={
              <Panel>
                <HeaderIcon height={20} width={20} /> Register new agent
              </Panel>
            }
            actions={
              <Panel align="end">
                <CancelButton type="secondary" onClick={() => setIsCancelModalOpened(true)}>
                  Cancel
                </CancelButton>
              </Panel>
            }
          />
          <Wizard
            initialValues={agent}
            onSubmit={registerAgent(() => {
              showMessage({ type: 'SUCCESS', text: 'Agent has been registered' });
              push(`/full-page/${agentId}/${buildVersion}/dashboard`);
            })}
          >
            <Step
              name="General settings"
              component={GeneralSettingsForm}
              validate={composeValidators(
                required('name'),
                required('description'),
                sizeLimit({ name: 'name' }),
                sizeLimit({ name: 'group' }),
                sizeLimit({ name: 'description', min: 3, max: 256 }),
              )}
            />
            <Step
              name="System settings"
              component={SystemSettingsForm}
              validate={composeValidators(
                requiredArray('packagesPrefixes'),
                sizeLimit({
                  name: 'sessionIdHeaderName',
                  alias: 'Session header name',
                  min: 1,
                  max: 256,
                }),
              )}
            />
            <Step name="Plugins" component={InstallPluginsStep} />
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
  ),
);

const HeaderIcon = agentRegistrationPage.headerIcon(Icons.Register);
const CancelButton = agentRegistrationPage.cancelButton(Button);
