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
import {
  useEffect, useRef, useState,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Icons, Button, GeneralAlerts,
} from '@drill4j/ui-kit';
import 'twin.macro';

import {
  PageHeader, Wizard, Step,
} from 'components';
import {
  requiredArray, composeValidators, required, sizeLimit,
} from 'forms';
import { useAgent } from 'hooks';
import { CancelAgentRegistrationModal, InstallPluginsStep, SystemSettingsStep } from 'modules';
import { Agent } from 'types/agent';
import { JavaGeneralRegistrationForm } from './java-general-registration-form';
import { JsGeneralRegistrationForm } from './js-general-registration-form';
import { JsSystemRegistrationForm } from './js-system-registration-form';

export const AgentRegistrationPage = () => {
  const { agentId = '' } = useParams<{ agentId: string }>();
  const { push } = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { buildVersion = '', plugins = [], ...agent } = useAgent(agentId) || {};
  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <PageHeader
        title={(
          <div className="flex items-center gap-x-4">
            <Icons.Register height={20} width={20} />
            {agentId ? `${agent.agentType} Agent Registration` : 'Offline Agent Preregistration'}
          </div>
        )}
        actions={(
          <div className="flex justify-end items-center w-full">
            <Button secondary size="large" onClick={() => setIsCancelModalOpened(true)}>
              Abort {agentId ? 'Registration' : 'Preregistration'}
            </Button>
          </div>
        )}
      />
      <Wizard
        initialValues={agent}
        onSubmit={async (data: Agent) => {
          if (agentId) {
            await registerAgent(data);
            if (isMounted.current) {
              if (data.plugins?.length === 1) {
                const [plugin] = data.plugins;
                push(`/full-page/${agentId}/${buildVersion}/${plugin}/dashboard${plugin === 'test2code' ? '/methods' : ''}`);
              } else {
                push(`/full-page/${agentId}/${buildVersion}/dashboard`);
              }
            }
          } else {
            await preregisterOfflineAgent(data);
            push('/agents');
          }
        }}
        onSuccessMessage={agentId ? 'Agent has been registered' : 'Offline agent has been preregistered'}
      >
        <Step
          name="General Settings"
          component={agent.agentType === 'Node.js' ? JsGeneralRegistrationForm : JavaGeneralRegistrationForm}
          validate={composeValidators(
            !agentId && required('id', 'Agent ID'),
            !agentId && sizeLimit({
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
          component={agent.agentType === 'Node.js' ? JsSystemRegistrationForm : SystemSettingsStep}
          validate={agent.agentType === 'Node.js'
            ? composeValidators(!agent.group && required('systemSettings.targetHost', 'Target Host'))
            : composeValidators(
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
};

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
