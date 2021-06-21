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
  matchPath, Route, useLocation, Link,
} from 'react-router-dom';
import { Icons, Button, GeneralAlerts } from '@drill4j/ui-kit';
import 'twin.macro';

import { PluginListEntry, Stub } from 'components';
import { Agent } from 'types/agent';
import { useWsConnection } from 'hooks';
import { Plugin } from 'types/plugin';
import { defaultAdminSocket } from 'common/connection';
import { AddPluginsModal } from './add-plugins-modal';

interface Props {
  agent: Agent;
}

export const PluginsSettingsTab = ({ agent: { buildVersion = '' } }: Props) => {
  const { pathname } = useLocation();
  const { params: { type: agentType = '', id = '' } = {} } = matchPath<{ type: 'service-group' | 'agent', id: string }>(pathname, {
    path: '/agents/:type/:id/settings/:tab',
  }) || {};
  const pluginsTopic = `/${agentType === 'agent' ? 'agents' : 'groups'}/${id}/plugins`;
  const plugins = useWsConnection<Plugin[]>(defaultAdminSocket, pluginsTopic) || [];
  const installedPlugins = plugins.filter((plugin) => !plugin.available);
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);

  return (
    <div tw="flex flex-col h-full w-full">
      <GeneralAlerts type="INFO">
        {`Installed plugins on your ${agentType === 'agent' ? 'agent' : 'service group'}.`}
      </GeneralAlerts>
      <div tw="flex justify-between pt-6 pb-6 mr-6 ml-6 text-20">
        <span>
          Plugins
          <span tw="ml-2 font-regular text-monochrome-default">{installedPlugins.length}</span>
        </span>
        <Link
          to={`/agents/${agentType}/${id}/settings/plugins/add-plugin-modal`}
          data-test={`${agentType}-info-page:add-plugin-button`}
        >
          <Button
            tw="flex items-center justify-center gap-x-2 h-full pl-2 pr-2 text-14"
            secondary
          >
            <Icons.Add />
            Add plugin
          </Button>
        </Link>
      </div>
      <div tw="flex-grow mr-6 ml-6">
        {installedPlugins.length > 0 ? (
          installedPlugins.map(({
            id: pluginId, name, description, version,
          }) => (
            <Link
              to={agentType === 'agent'
                ? `/full-page/${id}/${buildVersion}/${pluginId}/dashboard/methods`
                : `/service-group-full-page/${id}/${pluginId}`}
              key={pluginId}
            >
              <PluginListEntry
                key={id}
                description={description}
                icon={name as keyof typeof Icons}
              >
                <div className="flex items-center w-full">
                  <div tw="font-semibold text-14 leading-22 link">{name}&nbsp;</div>
                  {version && <div tw="text-14 leading-22 text-monochrome-default">({version})</div>}
                </div>
              </PluginListEntry>
            </Link>
          ))
        ) : (
          <Stub
            icon={<Icons.Plugins tw="text-monochrome-medium-tint" height={160} width={160} />}
            title={<span tw="text-24">No plugins installed</span>}
            message={`There are no plugins installed on this ${agentType === 'agent' ? 'agent' : 'service group'} at the moment.`}
          />
        )}
      </div>
      <Route
        path="/agents/:type/:id/settings/plugins/add-plugin-modal"
        render={() => (
          <AddPluginsModal
            plugins={plugins}
            selectedPlugins={selectedPlugins}
            setSelectedPlugins={setSelectedPlugins}
          />
        )}
      />
    </div>
  );
};
