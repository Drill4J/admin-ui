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
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';
import { Icons, Button } from '@drill4j/ui-kit';

import { PluginListEntry } from 'components';
import { Agent } from 'types/agent';
import { useWsConnection } from 'hooks';
import { Plugin } from 'types/plugin';
import { defaultAdminSocket } from 'common/connection';
import { AddPluginsModal } from './add-plugins-modal';
import { NoPluginsStub } from './no-plugins-stub';

import styles from './plugins-settings-tab.module.scss';

interface Props {
  className?: string;
  agent: Agent;
}

const pluginsSettingsTab = BEM(styles);

export const PluginsSettingsTab = pluginsSettingsTab(
  ({
    className,
    agent: { id = '', buildVersion = '' },
  }: Props) => {
    const [isAddPluginOpen, setIsAddPluginOpen] = useState(false);
    const { type: agentType } = useParams<{ type: 'service-group' | 'agent' }>();
    const { push } = useHistory();
    const pluginsTopic = `/${agentType === 'agent' ? 'agents' : 'service-groups'}/${id}/plugins`;
    const plugins = useWsConnection<Plugin[]>(defaultAdminSocket, pluginsTopic) || [];
    const installedPlugins = plugins.filter((plugin) => !plugin.available);
    const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);

    return (
      <div className={className}>
        <InfoPanel className="flex justify-between items-center w-full px-6">
          <div className="flex items-center w-full">
            <InfoIcon />
            {`Plugins installed on your ${agentType === 'agent' ? 'agent' : 'service group'}.`}
          </div>
        </InfoPanel>
        <Header>
          <span>
            Plugins
            <PluginsCount>{installedPlugins.length}</PluginsCount>
          </span>
          <AddPluginButton
            className="flex gx-2"
            type="secondary"
            onClick={() => setIsAddPluginOpen(!isAddPluginOpen)}
            data-test={`${agentType}-info-page:add-plugin-button`}
          >
            <Icons.Add />
            <span>Add plugin</span>
          </AddPluginButton>
        </Header>
        <Content>
          {installedPlugins.length > 0 ? (
            installedPlugins.map(({
              id: pluginId, name, description, version,
            }) => (
              <PluginListEntry
                key={id}
                description={description}
                onClick={() => (agentType === 'agent'
                  ? push(`/full-page/${id}/${buildVersion}/${pluginId}/dashboard`)
                  : push(`/service-group-full-page/${id}/${pluginId}`))}
                icon={name as keyof typeof Icons}
              >
                <div className="flex items-center w-full">
                  <PluginName>{name}&nbsp;</PluginName>
                  {version && <PluginVersion>({version})</PluginVersion>}
                </div>
              </PluginListEntry>
            ))
          ) : (
            <NoPluginsStub>
              {`There are no plugins installed on this ${agentType === 'agent' ? 'agent' : 'service group'} at the moment.`}
            </NoPluginsStub>
          )}
        </Content>
        {isAddPluginOpen && (
          <AddPluginsModal
            isOpen={isAddPluginOpen}
            onToggle={setIsAddPluginOpen}
            plugins={plugins}
            agentId={id}
            selectedPlugins={selectedPlugins}
            setSelectedPlugins={setSelectedPlugins}
          />
        )}
      </div>
    );
  },
);

const InfoPanel = pluginsSettingsTab.infoPanel('div');
const InfoIcon = pluginsSettingsTab.infoIcon(Icons.Info);
const Content = pluginsSettingsTab.content('div');
const Header = pluginsSettingsTab.header('div');
const PluginsCount = pluginsSettingsTab.pluginsCount('span');
const AddPluginButton = pluginsSettingsTab.addPlugin(Button);
const PluginName = pluginsSettingsTab.pluginName('div');
const PluginVersion = pluginsSettingsTab.pluginVersion('div');
