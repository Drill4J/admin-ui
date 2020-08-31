import * as React from 'react';
import { Field } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import { FormGroup, GeneralAlerts } from '@drill4j/ui-kit';

import { Fields } from 'forms';

import styles from './manage-new-session.module.scss';

interface Props {
  className?: string;
  agentId: string;
  serviceGroupId: string;
}

const manageNewSession = BEM(styles);

export const ManageNewSession = manageNewSession(({ className, agentId, serviceGroupId }: Props) => (
  <div className={className}>
    <GeneralAlerts type="INFO">
      <span data-test="manage-new-session:info-general-alert">
        Pay attention that you have to specify Header Mapping in&nbsp;
        {agentId
          ? (
            <SettingsLink
              to={`/agents/agent/${agentId}/settings/`}
              data-test="manage-new-session:settings-link:agent"
            >
              Agent Settings
            </SettingsLink>
          )
          : (
            <SettingsLink
              to={`/agents/service-group/${serviceGroupId}/settings/`}
              data-test="manage-new-session:settings-link:service-group"
            >
              Service Group Settings
            </SettingsLink>
          )}
      </span>
    </GeneralAlerts>
    <NewSessionForm label="Session ID">
      <Field name="sessionId" component={Fields.Input} placeholder="Enter session ID" />
    </NewSessionForm>
  </div>
));

const SettingsLink = manageNewSession.settingsLink(NavLink);
const NewSessionForm = manageNewSession.newSessionForm(FormGroup);
