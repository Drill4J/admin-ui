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
import { LinkButton } from '@drill4j/ui-kit';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Fields } from 'forms';
import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setBulkOperation } from '../store';

import styles from './management-active-sessions.module.scss';

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
}

const managementActiveSessions = BEM(styles);

export const ManagementActiveSessions = managementActiveSessions(({ className, activeSessions }: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation, singleOperation } = useSessionsPaneState();
  const disabled = bulkOperation.isProcessing || Boolean(singleOperation.id);

  return (
    <div className={className} data-test="management-active-sessions:search-panel">
      <Content>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>
            Active Sessions
            <Count>{activeSessions.length}</Count>
          </span>
          <ActionsPanel>
            <LinkButton
              size="small"
              onClick={() => dispatch(setBulkOperation('abort', true))}
              data-test="management-active-sessions:abort-all"
              disabled={disabled}
            >
              Abort all
            </LinkButton>
            <LinkButton
              size="small"
              onClick={() => dispatch(setBulkOperation('finish', true))}
              data-test="management-active-sessions:finish-all"
              disabled={disabled}
            >
              Finish all
            </LinkButton>
          </ActionsPanel>
        </div>
        <form>
          <Field
            name="id"
            component={Fields.Search}
            placeholder="Search session by ID"
            disabled
          />
        </form>
      </Content>
    </div>
  );
});

const Count = managementActiveSessions.count('span');
const ActionsPanel = managementActiveSessions.actionsPanel('div');
const Content = managementActiveSessions.content('div');
