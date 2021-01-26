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
import { useContext, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import {
  Button, FormGroup, Popup, GeneralAlerts,
} from '@drill4j/ui-kit';

import {
  Fields,
  composeValidators,
  sizeLimit,
  required,
} from 'forms';
import { NotificationManagerContext } from 'notification-manager';
import { ScopeSummary } from 'types/scope-summary';
import { ActiveScope } from 'types/active-scope';
import { renameScope } from '../../api';
import { usePluginState } from '../../../store';

import styles from './rename-scope-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  scope: ActiveScope | null;
}

const renameScopeModal = BEM(styles);

const validateScope = composeValidators(
  required('name', 'Scope Name'),
  sizeLimit({
    name: 'name', min: 1, max: 64, alias: 'Scope name',
  }),
);

export const RenameScopeModal = renameScopeModal(
  ({
    className, isOpen, onToggle, scope,
  }: Props) => {
    const { agentId } = usePluginState();
    const { pluginId = '' } = useParams<{ pluginId: string }>();
    const { showMessage } = useContext(NotificationManagerContext);
    const [errorMessage, setErrorMessage] = useState('');

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<div className="fs-20">Rename Scope</div>}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          {errorMessage && (
            <GeneralAlerts type="ERROR">
              {errorMessage}
            </GeneralAlerts>
          )}
          <Form
            onSubmit={(values) => renameScope(agentId, pluginId, {
              onSuccess: () => {
                showMessage({ type: 'SUCCESS', text: 'Scope name has been changed' });
                onToggle(false);
              },
              onError: setErrorMessage,
            })(values as ScopeSummary)}
            validate={validateScope}
            initialValues={scope || {}}
            render={({ handleSubmit }) => (
              <div className="m-6">
                <FormGroup label="Scope Name">
                  <Field name="name" component={Fields.Input} placeholder="Enter scope name" />
                </FormGroup>
                <div className="d-flex align-items-center g-4 w-100 mt-6">
                  <Button type="primary" size="large" onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button type="secondary" size="large" onClick={() => onToggle(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          />
        </div>
      </Popup>
    );
  },
);
