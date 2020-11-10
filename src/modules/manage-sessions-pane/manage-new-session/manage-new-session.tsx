import * as React from 'react';
import { Field } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import {
  FormGroup,
  GeneralAlerts,
  Icons,
  Panel,
  Tooltip,
} from '@drill4j/ui-kit';

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
    <NewSessionForm>
      <FormGroup label="Session ID">
        <Field name="sessionId" component={Fields.Input} placeholder="Enter session ID" />
      </FormGroup>
      <Field
        name="isGlobal"
        type="checkbox"
        component={Fields.Checkbox}
        render={({ input, meta }) => (
          <GlobalSessionCheckbox>
            <Fields.Checkbox
              input={input}
              meta={meta}
            />
            <Tooltip
              message={(
                <Panel direction="column" align="center">
                  <div>Session that tracks all of the executions on your JVM</div>
                  <div>(e.g. background tasks)</div>
                </Panel>
              )}
            >
              <IconInfo />
            </Tooltip>
          </GlobalSessionCheckbox>
        )}
      />
      <Field
        name="isRealtime"
        type="checkbox"
        component={Fields.Checkbox}
        label="Real-time coverage collection"
      />
    </NewSessionForm>
  </div>
));

const SettingsLink = manageNewSession.settingsLink(NavLink);
const NewSessionForm = manageNewSession.newSessionForm('div');
const GlobalSessionCheckbox = manageNewSession.globalSessionCheckbox(Panel);
const IconInfo = manageNewSession.iconInfo(Icons.Info);
