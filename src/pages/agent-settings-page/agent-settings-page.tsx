import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form } from 'react-final-form';
import axios from 'axios';

import { PageHeader, Icons } from '../../components';
import { Panel } from '../../layouts';
import { Button, composeValidators, sizeLimit, required } from '../../forms';
import { useAgent } from '../../hooks';
import { AGENT_STATUS } from '../../common/constants';
import { NotificationManagerContext } from '../../notification-manager';
import { AgentSettingsForm } from './agent-settings-form/agent-settings-form';
import { UnregisterAgentModal } from './unregister-agent-modal';
import { Agent } from '../../types/agent';
import { Message } from '../../types/message';
import { BuildVersion } from '../../types/build-version';

import styles from './agent-settings-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentSettingsPage = BEM(styles);

const validateSettings = composeValidators(
  required('name'),
  required('description'),
  sizeLimit('name'),
  sizeLimit('group'),
  sizeLimit('description', 3, 256),
);

export const AgentSettingsPage = withRouter(
  agentSettingsPage(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const agent = useAgent(agentId, () => push('/not-found')) || {};
    const { showMessage } = React.useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isUnregisterModalOpen, setIsUnregisterModalOpen] = React.useState(false);

    return (
      <div className={className}>
        <Form
          onSubmit={(values) => saveChanges(values, showMessage, setErrorMessage)}
          initialValues={agent}
          validate={validateSettings as any}
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
                    {agent.status !== AGENT_STATUS.NOT_REGISTERED && (
                      <UnregisterAgentButton
                        type="secondary"
                        onClick={() => setIsUnregisterModalOpen(true)}
                      >
                        Unregister
                      </UnregisterAgentButton>
                    )}
                  </Panel>
                }
              />
              {errorMessage && (
                <ErrorMessage>
                  <ErrorMessageIcon />
                  {errorMessage}
                </ErrorMessage>
              )}
              <Content>
                <AgentSettingsForm
                  buildVersions={values.buildVersions as BuildVersion[]}
                  agentId={agentId}
                />
              </Content>
              {isUnregisterModalOpen && (
                <UnregisterAgentModal
                  isOpen={isUnregisterModalOpen}
                  onToggle={setIsUnregisterModalOpen}
                  agentId={agentId}
                />
              )}
            </>
          )}
        />
      </div>
    );
  }),
);

const HeaderIcon = agentSettingsPage.headerIcon(Icons.Settings);
const SaveChangesButton = agentSettingsPage.saveChangesButton(Button);
const UnregisterAgentButton = agentSettingsPage.unregisterAgentButton(Button);
const ErrorMessage = agentSettingsPage.errorMessage(Panel);
const ErrorMessageIcon = agentSettingsPage.errorMessageIcon(Icons.Warning);
const Content = agentSettingsPage.content('div');

async function saveChanges(
  agent: Agent,
  showMessage: (message: Message) => void,
  setErrorMessage: (message: string) => void,
) {
  try {
    await axios.post(`/agent/${agent.id}`, agent);
    setErrorMessage('');
    showMessage({ type: 'SUCCESS', text: 'New settings have been saved' });
  } catch (error) {
    setErrorMessage(error.message);
  }
}
