import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import queryString from 'query-string';
import { Panel, Icons, Button } from '@drill4j/ui-kit';

import { PluginListEntry } from 'components';
import { useWsConnection } from 'hooks';
import { CancelAgentRegistrationModal } from 'modules';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import { Plugin } from 'types/plugin';
import { registerAgent } from './register-service-group';

import styles from './service-group-registration-page.module.scss';

interface Props {
  className?: string;
}

const serviceGroupRegistrationPage = BEM(styles);

export const ServiceGroupRegistrationPage = serviceGroupRegistrationPage(
  ({
    className,
  }: Props) => {
    const { push } = useHistory();
    const { serviceGroupId = '' } = useParams();
    const { search } = useLocation();
    const [isCancelModalOpened, setIsCancelModalOpened] = React.useState(false);
    const { showMessage } = React.useContext(NotificationManagerContext);
    const availiblePlugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/plugins') || [];
    const handeRegisterAgent = registerAgent({
      onSuccess: () => {
        showMessage({ type: 'SUCCESS', text: 'Multiple agents registration has been finished.' });
        push(`/service-group-full-page/${serviceGroupId}/service-group-dashboard`);
      },
    });
    const { unregisteredAgentsCount, serviceGroupName } = queryString.parse(search);

    return (
      <div className={className}>
        <Form
          onSubmit={handeRegisterAgent}
          initialValues={{
            id: serviceGroupId, plugins: [],
          }}
          render={({ handleSubmit, values: { plugins = [] } }) => (
            <>
              <Header align="space-between">
                <div>
                  <Icons.Register />
                  &nbsp;Register new agents
                </div>
                <div>
                  <Button type="secondary" size="large" onClick={() => setIsCancelModalOpened(true)}>Cancel</Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleSubmit()}
                  >
                    <Icons.Check /> Finish registration
                  </Button>
                </div>
              </Header>
              <InfoPanel>
                <InfoIcon />
                <InfoPanelText>
                  In bulk registration basic and system settings will be set up automatically.
                  Selected plugins will be installed on all agents.
                  <br />
                  You will be able to change configuration of any agent separately on Agent Settings page.
                  <div>
                    <strong>Agents to register:</strong> {unregisteredAgentsCount}. <strong>Service Group:</strong> {serviceGroupName}.
                  </div>
                </InfoPanelText>
              </InfoPanel>
              <ActionName>Choose plugins to install</ActionName>
              <SelectedPluginsInfo>
                {plugins.length}&nbsp;of&nbsp;{availiblePlugins.length} selected
              </SelectedPluginsInfo>
              <PluginsList>
                {availiblePlugins.map(({
                  id = '', name, description, version,
                }) => (
                  <Field
                    name="plugins"
                    type="checkbox"
                    value={id}
                    key={id}
                    render={({ input, meta }) => (
                      <PluginListEntry
                        description={description}
                        input={input}
                        meta={meta}
                        icon={name as keyof typeof Icons}
                        onClick={() => input.onChange({
                          target: {
                            type: 'checkbox',
                            checked: !input.checked,
                          },
                        })}
                      >
                        <Panel>
                          <PluginName>{name}&nbsp;</PluginName>
                          {version && <PluginVersion>({version})</PluginVersion>}
                        </Panel>
                      </PluginListEntry>
                    )}
                  />
                ))}
              </PluginsList>
            </>
          )}
        />
        {isCancelModalOpened && (
          <CancelAgentRegistrationModal
            isOpen={isCancelModalOpened}
            onToggle={setIsCancelModalOpened}
          />
        )}
      </div>
    );
  },
);

const Header = serviceGroupRegistrationPage.header(Panel);
const InfoPanel = serviceGroupRegistrationPage.infoPanel('div');
const ActionName = serviceGroupRegistrationPage.actionName('div');
const InfoPanelText = serviceGroupRegistrationPage.infoPanelText('div');
const InfoIcon = serviceGroupRegistrationPage.infoIcon(Icons.Info);
const SelectedPluginsInfo = serviceGroupRegistrationPage.selectedPluginsInfo('div');
const PluginsList = serviceGroupRegistrationPage.pluginsList('div');
const PluginName = serviceGroupRegistrationPage.pluginName('div');
const PluginVersion = serviceGroupRegistrationPage.pluginVersion('div');
