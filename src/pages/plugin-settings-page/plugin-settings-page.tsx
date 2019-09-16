import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import axios from 'axios';

import { PageHeader, Icons } from '../../components';
import { Panel } from '../../layouts';
import { FormGroup, Fields, Button, requiredArray } from '../../forms';
import { useWsConnection, useAgent } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';
import { NotificationManagerContext } from '../../notification-manager';
import { Message } from '../../types/message';
import { CoveragePluginConfig } from '../../types/coverage-plugin-config';

import styles from './plugin-settings-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const pluginSettingsPage = BEM(styles);

const validatePathPrefixes = requiredArray('pathPrefixes');

export const PluginSettingsPage = withRouter(
  pluginSettingsPage(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const agent = useAgent(agentId, () => push('/not-found')) || {};
    const { pathPrefixes = [] } =
      useWsConnection<CoveragePluginConfig>(defaultAdminSocket, `/${agentId}/coverage/config`) ||
      {};
    const { showMessage } = React.useContext(NotificationManagerContext);

    return (
      <div className={className}>
        <Form
          initialValues={{ agentId: agent.id, pathPrefixes }}
          onSubmit={saveChanges(showMessage) as any}
          validate={validatePathPrefixes as any}
          render={({ handleSubmit, submitting, pristine, invalid }) => (
            <>
              <PageHeader
                title={
                  <Panel>
                    <PluginIcon height={20} width={20} />
                    Code Coverage Tracker
                  </Panel>
                }
                actions={
                  <SaveButton
                    type="primary"
                    onClick={handleSubmit as any}
                    disabled={submitting || pristine || invalid}
                  >
                    Save changes
                  </SaveButton>
                }
              />
              <Content>
                <Title>Settings</Title>
                <Instructions>
                  Please add project package(s) name below. In case you add more than one, use new
                  line as a separator.
                </Instructions>
                <FormGroup label="Project Package(s)">
                  <Field
                    name="pathPrefixes"
                    component={ProjectPackages}
                    parse={(value) => value.split(/\n/)}
                    format={(value) =>
                      value.reduce(
                        (acc: string, item: string, index: number) =>
                          index !== value.length - 1 ? acc + item + '\n' : acc + item,
                        '',
                      )
                    }
                    placeholder="Package name 1&#10;Package name 2&#10;Package name 3&#10;and so on."
                  />
                </FormGroup>
              </Content>
            </>
          )}
        />
      </div>
    );
  }),
);

const PluginIcon = pluginSettingsPage.icon(Icons.Plugins);
const SaveButton = pluginSettingsPage.saveButton(Button);
const Content = pluginSettingsPage.content('div');
const Title = pluginSettingsPage.title('div');
const Instructions = pluginSettingsPage.instructions('div');
const ProjectPackages = pluginSettingsPage.projectPackages(Fields.Textarea);

function saveChanges(showMessage: (message: Message) => void) {
  return async ({ agentId, pathPrefixes }: { agentId: string; pathPrefixes: string[] }) => {
    try {
      await axios.patch(`/agents/${agentId}/coverage/update-plugin`, {
        pathPrefixes: pathPrefixes.filter(Boolean),
      });
      showMessage({ type: 'SUCCESS', text: 'Plugin config is saved' });
    } catch ({ message }) {
      showMessage({ type: 'ERROR', text: message });
    }
  };
}
