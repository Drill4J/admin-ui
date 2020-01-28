import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import queryString from 'query-string';

import { Panel } from 'layouts';
import { Icons, PluginListEntry } from 'components';
import { Button, CancelButton } from 'forms';
import { useWsConnection } from 'hooks';
import { CancelAgentRegistrationModal } from 'modules';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import { Plugin } from 'types/plugin';
import { registerAgent } from './register-service-group';

import styles from './service-group-registration-page.module.scss';

interface Props extends RouteComponentProps<{ serviceGroupId: string }> {
  className?: string;
}

const serviceGroupRegistrationPage = BEM(styles);

export const ServiceGroupRegistrationPage = withRouter(
  serviceGroupRegistrationPage(
    ({
      className,
      match: {
        params: { serviceGroupId },
      },
      location: { search },
      history: { push },
    }: Props) => {
      const [isCancelModalOpened, setIsCancelModalOpened] = React.useState(false);
      const { showMessage } = React.useContext(NotificationManagerContext);
      const availiblePlugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/get-all-plugins') || [];
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
                    <CancelButton size="large" onClick={() => setIsCancelModalOpened(true)}>Cancel</CancelButton>
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
                  {availiblePlugins.map(({ id = '', name, description }) => (
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
                          icon={id === 'test-to-code-mapping' ? 'TestToCodeMapping' : 'Plugins'}
                          onClick={() => input.onChange({
                            target: {
                              type: 'checkbox',
                              checked: !input.checked,
                            },
                          })}
                        >
                          <PluginName>{name}</PluginName>
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
  ),
);

const Header = serviceGroupRegistrationPage.header(Panel);
const InfoPanel = serviceGroupRegistrationPage.infoPanel('div');
const ActionName = serviceGroupRegistrationPage.actionName('div');
const InfoPanelText = serviceGroupRegistrationPage.infoPanelText('div');
const InfoIcon = serviceGroupRegistrationPage.infoIcon(Icons.Info);
const SelectedPluginsInfo = serviceGroupRegistrationPage.selectedPluginsInfo('div');
const PluginsList = serviceGroupRegistrationPage.pluginsList('div');
const PluginName = serviceGroupRegistrationPage.pluginName('div');
