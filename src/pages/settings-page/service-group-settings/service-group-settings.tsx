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
import { useState } from 'react';
import {
  useParams, Switch, useHistory, Route, Prompt,
} from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { useServiceGroup } from 'hooks';
import { TabsPanel, Tab, PageHeader } from 'components';
import { PluginsSettingsTab, SystemSettingsForm } from 'modules';
import { ServiceGroupGeneralSettingsForm } from './service-group-general-settings-form';
import { UnSaveChangeModal } from '../un-save-changes-modal';

export const ServiceGroupSettings = () => {
  const [pristineSettings, setPristineSettings] = useState(true);
  const [nextLocation, setNextLocation] = useState('');
  const { id = '', tab: selectedTab = '' } = useParams<{ id: string; tab: string }>();
  const serviceGroup = useServiceGroup(id) || {};
  const { push } = useHistory();

  return (
    <div tw="flex flex-col w-full">
      <PageHeader
        title={(
          <div tw="flex items-center gap-x-4 w-full ">
            <Icons.Settings tw="text-monochrome-default" height={20} width={20} />
            Service Group Settings
          </div>
        )}
      />
      <div tw="px-6">
        <TabsPanel
          activeTab={selectedTab}
          onSelect={(tab) => (pristineSettings
            ? push(`/agents/service-group/${id}/settings/${tab}`, { pristineSettings })
            : setNextLocation(`/agents/service-group/${id}/settings/${tab}`))}
        >
          <Tab name="general">General</Tab>
          <Tab name="system">System</Tab>
          <Tab name="plugins">Plugins</Tab>
        </TabsPanel>
      </div>
      <Switch>
        <Route
          path="/agents/service-group/:id/settings/general"
          render={() => <ServiceGroupGeneralSettingsForm serviceGroup={serviceGroup} setPristineSettings={setPristineSettings} />}
        />
        <Route
          path="/agents/service-group/:id/settings/system"
          render={() => <SystemSettingsForm agent={serviceGroup} setPristineSettings={setPristineSettings} isServiceGroup />}
        />
        <Route
          path="/agents/service-group/:id/settings/plugins"
          render={() => <PluginsSettingsTab agent={serviceGroup} />}
        />
      </Switch>
      <UnSaveChangeModal
        isOpen={Boolean(nextLocation)}
        onToggle={() => setNextLocation('')}
        onConfirmAction={() => {
          push(nextLocation, { pristineSettings: true });
          setNextLocation('');
        }}
      />
      <Prompt
        when={!pristineSettings}
        message={({ pathname, state }) => {
          const { pristineSettings: pristine = false } = state as { pristineSettings: boolean } || {};
          if (pristine) {
            setPristineSettings(true);
            return true;
          }
          setNextLocation(pathname);
          return false;
        }}
      />
    </div>
  );
};
