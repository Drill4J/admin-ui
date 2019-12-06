import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { PageHeader, Icons } from '../../../components';
import { Button } from '../../../forms';
import { useAgent } from '../../../hooks';
import { PluginsSettingsTable } from './plugins-settings-table';
import { AddPluginsModal } from './add-plugins-modal';
import { NoPluginsStub } from './no-plugins-stub';
import { Panel } from '../../../layouts';

import styles from './plugins-settings.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const pluginsSettings = BEM(styles);

export const PluginsSettings = withRouter(
  pluginsSettings(
    ({
      className,
      history: { push },
      match: {
        params: { agentId },
      },
    }: Props) => {
      const agent = useAgent(agentId, () => push('/not-found')) || {};
      const [selectedPlugins, setSelectedPlugins] = React.useState<string[]>([]);
      const [isAddPluginOpen, setIsAddPluginOpen] = React.useState(false);
      return (
        <div className={className}>
          <InfoPanel align="space-between">
            <Panel>
              <InfoIcon />
              Plugins installed on your agent.
            </Panel>
          </InfoPanel>
          <Content>
            <PageHeader
              title={<PluginsTableTitle>Plugins</PluginsTableTitle>}
              itemsCount={(agent.plugins || []).length}
              actions={
                <AddPluginButton
                  type="secondary"
                  onClick={() => setIsAddPluginOpen(!isAddPluginOpen)}
                  data-test="agent-info-page:add-plugin-button"
                >
                  <Icons.Add />
                  <span>Add plugin</span>
                </AddPluginButton>
              }
            />
            {(agent.plugins || []).length > 0 ? (
              <PluginsSettingsTable
                plugins={agent.plugins}
                selectedPlugins={selectedPlugins}
                handleSelectPlugin={setSelectedPlugins}
                agentId={agent.id || ''}
                buildVersion={agent.buildVersion || ''}
              />
            ) : (
              <NoPluginsStub />
            )}
          </Content>
          <AddPluginsModal
            isOpen={isAddPluginOpen}
            onToggle={setIsAddPluginOpen}
            agentId={agentId}
          />
        </div>
      );
    },
  ),
);

const InfoPanel = pluginsSettings.infoPanel(Panel);
const InfoIcon = pluginsSettings.infoIcon(Icons.Info);
const Content = pluginsSettings.content('div');
const PluginsTableTitle = pluginsSettings.pluginsTableTitle('div');
const AddPluginButton = pluginsSettings.addPlugin(Button);
