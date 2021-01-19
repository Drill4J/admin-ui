import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';
import { Panel, Icons, Button } from '@drill4j/ui-kit';

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
        <InfoPanel align="space-between">
          <Panel>
            <InfoIcon />
            {`Plugins installed on your ${agentType === 'agent' ? 'agent' : 'service group'}.`}
          </Panel>
        </InfoPanel>
        <Header>
          <span>
            Plugins
            <PluginsCount>{installedPlugins.length}</PluginsCount>
          </span>
          <AddPluginButton
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
                <Panel>
                  <PluginName>{name}&nbsp;</PluginName>
                  {version && <PluginVersion>({version})</PluginVersion>}
                </Panel>
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

const InfoPanel = pluginsSettingsTab.infoPanel(Panel);
const InfoIcon = pluginsSettingsTab.infoIcon(Icons.Info);
const Content = pluginsSettingsTab.content('div');
const Header = pluginsSettingsTab.header('div');
const PluginsCount = pluginsSettingsTab.pluginsCount('span');
const AddPluginButton = pluginsSettingsTab.addPlugin(Button);
const PluginName = pluginsSettingsTab.pluginName('div');
const PluginVersion = pluginsSettingsTab.pluginVersion('div');
