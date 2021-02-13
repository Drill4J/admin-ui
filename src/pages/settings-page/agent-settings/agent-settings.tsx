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
  ReactNode, useState, useContext, useRef, useEffect,
} from 'react';
import { Button, Icons, Spinner } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';
import { Form } from 'react-final-form';
import axios from 'axios';

import { TabsPanel, Tab, PageHeader } from 'components';
import { useAgent } from 'hooks';
import { Agent } from 'types/agent';
import { NotificationManagerContext } from 'notification-manager';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import {
  composeValidators, required, requiredArray, sizeLimit,
} from 'forms';
import { JavaGeneralSettingsForm } from './java-general-settings-form';
import { JsGeneralSettingsForm } from './js-general-settings-form';
import { JsSystemSettingsForm } from './js-system-settings-form';
import { AgentStatusToggle } from '../../agents-page/agent-status-toggle';
import 'twin.macro';

interface TabsComponent {
  name: string;
  component: ReactNode;
}

export const AgentSettings = () => {
  const [unlockedPackages, setUnlockedPackages] = useState(false);
  const [selectedTab, setSelectedTab] = useState('general');
  const { id = '' } = useParams<{ id: string }>();
  const agent = useAgent(id) || {};
  const { showMessage } = useContext(NotificationManagerContext);
  const prevPristineRef = useRef(true);

  return (
    <Form
      onSubmit={async ({
        name, description, environment, systemSettings: {
          packages = [], sessionIdHeaderName, targetHost,
        } = {},
      }: Agent) => {
        try {
          const systemSettings = agent.agentType === 'Java'
            ? {
              packages: packages.filter(Boolean),
              sessionIdHeaderName,
            }
            : { targetHost };
          await axios.patch(`/agents/${id}/info`, { name, description, environment });
          await axios.put(`/agents/${id}/system-settings`, systemSettings);
          showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
          setUnlockedPackages(false);
        } catch ({ response: { data: { message } = {} } = {} }) {
          showMessage({
            type: 'ERROR',
            text: 'On-submit error. Server problem or operation could not be processed in real-time',
          });
        }
      }}
      initialValues={agent}
      validate={agent.agentType === 'Java'
        ? composeValidators(
          required('name'),
          sizeLimit({ name: 'name' }),
          sizeLimit({ name: 'environment' }),
          sizeLimit({ name: 'description', min: 3, max: 256 }),
          requiredArray('systemSettings.packages', 'Path prefix is required.'),
          sizeLimit({
            name: 'systemSettings.sessionIdHeaderName',
            alias: 'Session header name',
            min: 1,
            max: 256,
          }),
        )
        : composeValidators(
          required('name'),
          required('systemSettings.targetHost', 'Target Host'),
          sizeLimit({ name: 'name' }),
          sizeLimit({ name: 'environment' }),
          sizeLimit({ name: 'description', min: 3, max: 256 }),
        ) as any}
      render={({
        handleSubmit,
        submitting,
        invalid,
        pristine,
      }) => {
        const ref = useRef<HTMLFormElement>(null);
        const tabsComponents: TabsComponent[] = [
          {
            name: 'general',
            component: agent.agentType === 'Node.js' ? <JsGeneralSettingsForm /> : <JavaGeneralSettingsForm />,
          },
          {
            name: 'system',
            component: agent.agentType === 'Node.js'
              ? <JsSystemSettingsForm />
              : (
                <SystemSettingsForm
                  invalid={invalid}
                  setUnlockedPackages={setUnlockedPackages}
                  unlockedPackages={unlockedPackages}
                />
              ),
          },
          {
            name: 'plugins',
            component: <PluginsSettingsTab agent={agent} />,
          },
        ];
        useEffect(() => {
          if (!pristine) {
            prevPristineRef.current = pristine;
          }
        });

        useEffect(() => {
          const listener = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
              handleSubmit();
            }
          };
          ref && ref.current && ref.current.addEventListener('keydown', listener);
          return () => {
            ref && ref.current && ref.current.removeEventListener('keydown', listener);
          };
        }, []);
        const prevPristine = prevPristineRef.current;
        return (
          <form tw="flex flex-col w-full" ref={ref}>
            <PageHeader
              title={(
                <div tw="flex gap-x-4 items-center">
                  <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
                  {agent.agentType} Agent Settings
                  <AgentStatusToggle tw="mt-2 leading-20" agent={agent} />
                </div>
              )}
              actions={(
                <Button
                  className="flex justify-center items-center gap-x-1 w-32"
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={submitting || invalid || (pristine && prevPristine)}
                  data-test="java-general-settings-form:save-changes-button"
                >
                  {submitting ? <Spinner disabled /> : 'Save Changes'}
                </Button>
              )}
            />
            <TabsPanel tw="mx-6" activeTab={selectedTab} onSelect={setSelectedTab}>
              <Tab name="general">General</Tab>
              <Tab name="system">System</Tab>
              <Tab name="plugins">Plugins</Tab>
            </TabsPanel>
            {tabsComponents.find(({ name }) => name === selectedTab)?.component}
          </form>
        );
      }}
    />
  );
};
