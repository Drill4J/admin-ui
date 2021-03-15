/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Field } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import {
  FormGroup,
  GeneralAlerts,
  Icons,
  Tooltip,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { Fields } from 'forms';

interface Props {
  className?: string;
  agentId: string;
  serviceGroupId: string;
  hasGlobalSession: boolean;
}

const SettingsLink = styled(NavLink)`
  ${tw`font-bold`}
`;

export const ManagementNewSession = ({
  className, agentId, serviceGroupId, hasGlobalSession,
}: Props) => (
  <div className={className}>
    <GeneralAlerts type="INFO">
      <span data-test="management-new-session:info-general-alert">
        Pay attention that you have to specify Header Mapping in&nbsp;
        {agentId
          ? (
            <SettingsLink
              className="link"
              to={`/agents/agent/${agentId}/settings/general`}
              data-test="management-new-session:settings-link:agent"
            >
              Agent Settings
            </SettingsLink>
          )
          : (
            <SettingsLink
              className="link"
              to={`/agents/service-group/${serviceGroupId}/settings/general`}
              data-test="management-new-session:settings-link:service-group"
            >
              Service Group Settings
            </SettingsLink>
          )}
      </span>
    </GeneralAlerts>
    <div tw="grid gap-4 py-4 px-6">
      <FormGroup label="Session ID">
        <Field name="sessionId" component={Fields.Input} placeholder="Enter session ID" />
      </FormGroup>
      <Field
        name="isGlobal"
        type="checkbox"
        render={({ input, meta }) => (
          <div className="flex items-center gap-2">
            <Fields.Checkbox
              disabled={hasGlobalSession}
              input={input}
              meta={meta}
              label="Set as global session"
            />
            <Tooltip
              message={(
                <div className="text-center">
                  {hasGlobalSession
                    ? (
                      <>
                        Only one active global session is allowed.
                        <br />
                        Please finish the active one in order to start new.
                      </>
                    )
                    : (
                      <>
                        Session that tracks all of the executions on your JVM
                        <br />
                        (e.g. background tasks)
                      </>
                    )}
                </div>
              )}
            >
              <Icons.Info tw="text-monochrome-default" />
            </Tooltip>
          </div>
        )}
      />
      <Field
        name="isRealtime"
        type="checkbox"
        component={Fields.Checkbox}
        label="Real-time coverage collection"
      />
    </div>
  </div>
);
