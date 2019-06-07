import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import axios from 'axios';

import { PageHeader, Icons } from '../../components';
import { Panel } from '../../layouts';
import { Button, composeValidators, sizeLimit } from '../../forms';
import { useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';
import { NotificationManagerContext } from '../../notification-manager';
import { AgentSettingsForm } from './agent-settings-form/agent-settings-form';
import { Agent } from '../../types/agent';
import { Message } from '../../types/message';
import { BuildVersion } from '../../types/build-version';

import styles from './agent-settings-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentSettingsPage = BEM(styles);

export const validateSettings = composeValidators(
  sizeLimit('name'),
  sizeLimit('description', 3, 256),
);

const buildVersionAliasDecorator = createDecorator(
  {
    field: 'buildVersionAlias',
    updates: {
      buildVersions: (buildVersionAlias: string, allValues: any) =>
        allValues.buildVersions.map(({ id, name }: BuildVersion) =>
          id === allValues.buildVersion ? { id, name: buildVersionAlias } : { id, name },
        ),
    },
  },
  {
    field: 'buildVersion',
    updates: {
      buildVersionAlias: (buildVersion, allValues: any) =>
        allValues.buildVersions.find(({ id }: BuildVersion) => id === buildVersion).label,
    },
  },
);

export const AgentSettingsPage = withRouter(
  agentSettingsPage(({ className, match: { params: { agentId } } }: Props) => {
    const agent = useWsConnection<Agent>(defaultAdminSocket, `/get-agent/${agentId}`) || {};
    const { showMessage } = React.useContext(NotificationManagerContext);
    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, showMessage)}
          initialValues={agent}
          validate={validateSettings as any}
          decorators={[buildVersionAliasDecorator]}
          render={({
            handleSubmit,
            submitting,
            pristine,
            invalid,
            values,
          }: {
            handleSubmit: () => void;
            submitting: boolean;
            pristine: boolean;
            invalid: boolean;
            values: { [key: string]: unknown };
          }) => (
            <>
              <PageHeader
                title={
                  <Panel>
                    <HeaderIcon height={20} width={20} /> Settings:{' '}
                    {agent.name ? agent.name : agent.id}
                  </Panel>
                }
                actions={
                  <Panel align="end">
                    <SaveChangesButton
                      type="primary"
                      onClick={handleSubmit}
                      disabled={submitting || pristine || invalid}
                    >
                      Save changes
                    </SaveChangesButton>
                  </Panel>
                }
              />
              <Content>
                <AgentSettingsForm buildVersions={values.buildVersions} />
              </Content>
            </>
          )}
        />
      </div>
    );
  }),
);

const HeaderIcon = agentSettingsPage.headerIcon(Icons.Settings);
const SaveChangesButton = agentSettingsPage.saveChangesButton(Button);
const Content = agentSettingsPage.content('div');

async function saveChanges(agent: Agent, showMessage: (message: Message) => void) {
  try {
    await axios.post(`/agent/${agent.id}`, agent);
    showMessage({ type: 'SUCCESS', text: 'New settings are saved' });
  } catch (error) {
    showMessage({ type: 'ERROR', text: error.message });
  }
}
