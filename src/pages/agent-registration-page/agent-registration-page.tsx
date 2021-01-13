import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
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
import { Agent } from 'types/agent';
import { GeneralSettingsForm } from './general-settings-form';

import styles from './agent-registration-page.module.scss';

interface Props {
  className?: string;
}

const agentRegistrationPage = BEM(styles);

export const AgentRegistrationPage = agentRegistrationPage(
  ({
    className,
  }: Props) => {
    const { agentId = '' } = useParams<{ agentId: string }>();
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
              {agentId ? 'Register New Agent' : 'Preregister Offline Agent'}
            </Panel>
          )}
          actions={(
            <Panel align="end">
              <Button type="secondary" size="large" onClick={() => setIsCancelModalOpened(true)}>
                Abort {agentId ? 'Registration' : 'Preregistration'}
              </Button>
            </Panel>
          )}
        />
        <Wizard
          initialValues={agent}
          onSubmit={async (data: Agent) => {
            if (agentId) {
              await registerAgent(data);
              showMessage({ type: 'SUCCESS', text: 'Agent has been registered' });
              push(`/full-page/${agentId}/${buildVersion}/dashboard`);
            } else {
              await preregisterOfflineAgent(data);
              showMessage({ type: 'SUCCESS', text: 'Offline agent has been preregistered' });
              push('/agents');
            }
          }}
        >
          <Step
            name="General Settings"
            component={GeneralSettingsForm}
            validate={composeValidators(
              required('id', 'Agent ID'),
              sizeLimit({
                name: 'id', alias: 'Agent ID', min: 3, max: 32,
              }),
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
              requiredArray('systemSettings.packages', 'Path prefix is required.'),
              sizeLimit({
                name: 'systemSettings.sessionIdHeaderName',
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
            header={`Abort ${agentId ? 'Registration' : 'Preregistration'}`}
            message={`Are you sure you want to abort ${agentId
              ? 'agent registration'
              : 'offline agent preregistration'}? All your progress will be lost.`}
          />
        )}
      </div>
    );
  },
);

const HeaderIcon = agentRegistrationPage.headerIcon(Icons.Register);

async function preregisterOfflineAgent({
  id,
  name,
  environment,
  description,
  plugins,
  systemSettings,
}: Agent) {
  await axios.post('/agents', {
    id,
    name,
    agentType: 'JAVA',
    environment,
    description,
    plugins,
    systemSettings: {
      ...systemSettings,
      packages: systemSettings?.packages?.filter(Boolean),
    },
  });
}

async function registerAgent({
  id,
  name,
  environment,
  description,
  plugins,
  systemSettings,
}: Agent) {
  await axios.patch(`/agents/${id}`, {
    name,
    environment,
    description,
    plugins,
    systemSettings: {
      ...systemSettings,
      packages: systemSettings?.packages?.filter(Boolean),
    },
  });
}
