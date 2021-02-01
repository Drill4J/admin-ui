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
  useState, useContext, useEffect, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { Form } from 'react-final-form';
import { Button, Icons, Spinner } from '@drill4j/ui-kit';
import axios from 'axios';

import { useServiceGroup } from 'hooks';
import { TabsPanel, Tab, PageHeader } from 'components';
import { NotificationManagerContext } from 'notification-manager';
import {
  composeValidators, required, requiredArray, sizeLimit,
} from 'forms';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { ServiceGroupEntity } from 'types/service-group-entity';
import { ServiceGroupGeneralSettingsForm } from './service-group-general-settings-form';
import 'twin.macro';

interface TabsComponent {
  name: string;
  component: React.ReactNode;
}

export const ServiceGroupSettings = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const { id = '' } = useParams<{ id: string }>();
  const serviceGroup = useServiceGroup(id) || {};
  const { showMessage } = useContext(NotificationManagerContext);
  const prevPristineRef = useRef(true);
  return (
    <Form
      onSubmit={async ({
        name, description, environment, systemSettings: {
          packages = [], sessionIdHeaderName = '',
        } = {},
      }: ServiceGroupEntity) => {
        try {
          await axios.put(`/groups/${id}/system-settings`, {
            packages: packages.filter(Boolean),
            sessionIdHeaderName,
          });
          await axios.put(`/groups/${id}`, { name, description, environment });
          showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
        } catch ({ response: { data: { message } = {} } = {} }) {
          showMessage({
            type: 'ERROR',
            text: 'On-submit error. Server problem or operation could not be processed in real-time',
          });
        }
      }}
      initialValues={serviceGroup}
      validate={composeValidators(
        required('name', 'Service Group Name'),
        sizeLimit({ name: 'name', alias: 'Service Group Name' }),
        sizeLimit({ name: 'environment' }),
        sizeLimit({ name: 'description', min: 3, max: 256 }),
        requiredArray('systemSettings.packages', 'Path prefix is required.'),
        sizeLimit({
          name: 'systemSettings.sessionIdHeaderName',
          alias: 'Session header name',
          min: 1,
          max: 256,
        }),
      ) as any}
      render={({
        handleSubmit,
        submitting,
        pristine,
        invalid,
      }) => {
        const tabsComponents: TabsComponent[] = [
          {
            name: 'general',
            component: <ServiceGroupGeneralSettingsForm />,
          },
          {
            name: 'system',
            component: <SystemSettingsForm invalid={invalid} isServiceGroup />,
          },
          {
            name: 'plugins',
            component: <PluginsSettingsTab agent={serviceGroup} />,
          },
        ];
        useEffect(() => {
          if (!pristine) {
            prevPristineRef.current = pristine;
          }
        });
        const prevPristine = prevPristineRef.current;
        return (
          <div tw="flex flex-col w-full">
            <PageHeader
              title={(
                <div tw="flex items-center gap-x-4 w-full ">
                  <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
                  Service Group Settings
                </div>
              )}
              actions={(
                <Button
                  className="flex items-center gap-x-1"
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || invalid || (pristine && prevPristine)}
                  data-test="java-general-settings-form:save-changes-button"
                >
                  {submitting && <Spinner disabled />} Save Changes
                </Button>
              )}
            />
            <TabsPanel tw="mx-6" activeTab={selectedTab} onSelect={setSelectedTab}>
              <Tab name="general">General</Tab>
              <Tab name="system">System</Tab>
              <Tab name="plugins">Plugins</Tab>
            </TabsPanel>
            {tabsComponents.find(({ name }) => name === selectedTab)?.component}
          </div>
        );
      }}
    />
  );
};
