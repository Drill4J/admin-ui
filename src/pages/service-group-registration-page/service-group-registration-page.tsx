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
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Icons, Button, GeneralAlerts,
} from '@drill4j/ui-kit';
import queryString from 'query-string';
import 'twin.macro';

import { PageHeader, Wizard, Step } from 'components';
import { useWsConnection } from 'hooks';
import { CancelAgentRegistrationModal, SystemSettingsStep, InstallPluginsStep } from 'modules';
import {
  composeValidators, required, requiredArray, sizeLimit,
} from 'forms';
import { defaultAdminSocket } from 'common/connection';
import { Agent } from 'types/agent';
import { ServiceGroupGeneralRegistrationForm } from './service-group-general-registration-form';

export const ServiceGroupRegistrationPage = () => {
  const { push } = useHistory();
  const { serviceGroupId = '' } = useParams<{ serviceGroupId: string }>();
  const { search } = useLocation();
  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
  const serviceGroup = useWsConnection<Agent>(defaultAdminSocket, `/groups/${serviceGroupId}`) || {};
  const { unregisteredAgentsCount } = queryString.parse(search);
  const isMounted = useRef(true);
  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return (
    <div tw="w-full overflow-hidden">
      <PageHeader
        title={(
          <div className="flex gap-x-4 items-center w-full">
            <Icons.Register height={20} width={20} />
            Service Group Registration
          </div>
        )}
        actions={(
          <div className="flex justify-end items-center w-full">
            <Button type="secondary" size="large" onClick={() => setIsCancelModalOpened(true)}>
              Abort Registration
            </Button>
          </div>
        )}
      />
      <Wizard
        initialValues={serviceGroup}
        onSubmit={async (data: Agent) => {
          await registerServiceGroup(data);
          if (isMounted.current) {
            if (data.plugins?.length === 1) {
              const [plugin] = data.plugins;
              push(`/service-group-full-page/${serviceGroupId}/${plugin}`);
            } else {
              push(`/service-group-full-page/${serviceGroupId}/service-group-dashboard`);
            }
          }
        }}
        onSuccessMessage="Multiple agents registration has been finished."
      >
        <Step
          name="General settings"
          component={ServiceGroupGeneralRegistrationForm}
          validate={composeValidators(
            required('name', 'Service Group Name'),
            sizeLimit({ name: 'name', alias: 'Service Group Name' }),
            sizeLimit({ name: 'environment' }),
            sizeLimit({ name: 'description', min: 3, max: 256 }),
          )}
        />
        <Step
          name="System settings"
          component={SystemSettingsStep}
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
                  <div>
                    <div>
                      Choose plugins to install on your agents.
                      You will be able to change configuration of any agent separately on Agent Settings page.
                    </div>
                    <span tw="font-bold">
                      Agents to register:&nbsp;
                    </span>
                    {unregisteredAgentsCount}.&nbsp;
                    <span tw="font-bold">
                      Service Group:&nbsp;
                    </span>
                    {serviceGroup.name}.
                  </div>
                </GeneralAlerts>
              )}
            />
          )}
        />
      </Wizard>
      <CancelAgentRegistrationModal
        isOpen={isCancelModalOpened}
        onToggle={setIsCancelModalOpened}
        header="Abort Registration"
        message="Are you sure you want to abort agent registration? All your progress will be lost."
      />
    </div>
  );
};

async function registerServiceGroup({
  id,
  plugins,
  name = '',
  systemSettings,
  description,
  environment,
}: Agent) {
  await axios.patch(`/groups/${id}`, {
    plugins,
    name,
    systemSettings: {
      ...systemSettings,
      packages: systemSettings?.packages?.filter(Boolean),
    },
    description,
    environment,
  });
}
