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
import { useContext, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Panel, Icons, Button, GeneralAlerts,
} from '@drill4j/ui-kit';
import queryString from 'query-string';

import { PageHeader, Wizard, Step } from 'components';
import { useWsConnection } from 'hooks';
import { CancelAgentRegistrationModal, SystemSettingsStep, InstallPluginsStep } from 'modules';
import { composeValidators, requiredArray, sizeLimit } from 'forms';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import { Agent } from 'types/agent';

import styles from './service-group-registration-page.module.scss';

interface Props {
  className?: string;
}

const serviceGroupRegistrationPage = BEM(styles);

export const ServiceGroupRegistrationPage = serviceGroupRegistrationPage(
  ({ className }: Props) => {
    const { push } = useHistory();
    const { serviceGroupId = '' } = useParams<{ serviceGroupId: string }>();
    const { search } = useLocation();
    const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
    const { showMessage } = useContext(NotificationManagerContext);
    const serviceGroup = useWsConnection<Agent>(defaultAdminSocket, `/service-groups/${serviceGroupId}`) || {};
    const { unregisteredAgentsCount } = queryString.parse(search);

    return (
      <div className={className}>
        <PageHeader
          title={(
            <Panel>
              <HeaderIcon height={20} width={20} />
              Register New Agents
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
          initialValues={serviceGroup}
          onSubmit={async (data: Agent) => {
            await registerServiceGroup(data);
            showMessage({ type: 'SUCCESS', text: 'Multiple agents registration has been finished.' });
            push(`/service-group-full-page/${serviceGroupId}/service-group-dashboard`);
          }}
        >
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
                    <div>
                      <div>
                        Choose plugins to install on your agents.
                        You will be able to change configuration of any agent separately on Agent Settings page.
                      </div>
                      <AgentsInfo>
                        Agents to register:&nbsp;
                      </AgentsInfo>
                      {unregisteredAgentsCount}.&nbsp;
                      <AgentsInfo>
                        Service Group:&nbsp;
                      </AgentsInfo>
                      {serviceGroup.name}.
                    </div>
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
            header="Abort Registration"
            message="Are you sure you want to abort agent registration? All your progress will be lost."
          />
        )}
      </div>
    );
  },
);

const HeaderIcon = serviceGroupRegistrationPage.headerIcon(Icons.Register);
const AgentsInfo = serviceGroupRegistrationPage.agentsInfo('span');

async function registerServiceGroup({
  id,
  plugins,
  name = '',
  systemSettings,
}: Agent) {
  await axios.patch(`/service-groups/${id}`, {
    plugins,
    name,
    systemSettings: {
      ...systemSettings,
      packages: systemSettings?.packages?.filter(Boolean),
    },
  });
}
