import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, PluginPresentor } from 'components';
import { Button } from 'forms';
import { AddPluginsModal } from './add-plugins-modal';
import { NoPluginsStub } from './no-plugins-stub';
import { Agent } from 'types/agent';

import styles from './plugins-settings.module.scss';

interface Props extends RouteComponentProps<{ id: string }> {
  className?: string;
  agent: Agent;
}

const pluginsSettings = BEM(styles);

export const PluginsSettings = withRouter(
  pluginsSettings(
    ({
      className,
      agent: { id: agentId = '', plugins = [], buildVersion },
      history: { push },
    }: Props) => {
      const [isAddPluginOpen, setIsAddPluginOpen] = React.useState(false);
      return (
        <div className={className}>
          <InfoPanel align="space-between">
            <Panel>
              <InfoIcon />
              Plugins installed on your agent.
            </Panel>
          </InfoPanel>
          <Header align="space-between">
            <span>
              Plugins<PluginsCount>{(plugins || []).length}</PluginsCount>
            </span>
            <AddPluginButton
              type="secondary"
              onClick={() => setIsAddPluginOpen(!isAddPluginOpen)}
              data-test="agent-info-page:add-plugin-button"
            >
              <Icons.Add />
              <span>Add plugin</span>
            </AddPluginButton>
          </Header>
          <Content>
            {(plugins || []).length > 0 ? (
              plugins.map(({ id, name, description }) => (
                <PluginPresentor
                  key={id}
                  name={name}
                  description={description}
                  onClick={() => push(`/full-page/${agentId}/${buildVersion}/${id}/dashboard`)}
                />
              ))
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
const Header = pluginsSettings.header(Panel);
const PluginsCount = pluginsSettings.pluginsCount('span');
const AddPluginButton = pluginsSettings.addPlugin(Button);
