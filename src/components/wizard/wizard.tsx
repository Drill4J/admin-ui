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
import {
  Children, ComponentType, ReactElement, useReducer, useState, Component, useContext,
} from 'react';
import { Form } from 'react-final-form';
import {
  Icons, Button, Spinner,
} from '@drill4j/ui-kit';

import { Agent } from 'types/agent';

import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import {
  wizardReducer, previousStep, nextStep, state,
} from './wizard-reducer';
import { FormValidator } from '../../forms/form-validators';
import 'twin.macro';

export interface StepProps {
  name: string;
  component: ComponentType<any>;
  validate?: FormValidator;
}

interface Props {
  initialValues: Agent;
  onSubmit: (val: Record<string, unknown>) => Promise<void>;
  children: ReactElement<StepProps>[];
  onSuccessMessage: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Step = (props: StepProps) => null;

export const Wizard = ({
  children, initialValues, onSubmit, onSuccessMessage,
}: Props) => {
  const [{ currentStepIndex }, dispatch] = useReducer(wizardReducer, state);
  const [error, setError] = useState(false);
  const steps = Children.toArray(children);
  const { name, validate, component: StepComponent } = (steps[currentStepIndex] as Component<StepProps>).props;
  const availablePlugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/plugins') || [];
  const { showMessage } = useContext(NotificationManagerContext);

  return (
    <div>
      <Form
        initialValues={{ ...initialValues, availablePlugins, plugins: ['test2code'] }}
        keepDirtyOnReinitialize
        onSubmit={async (values) => {
          try {
            await onSubmit(values);
            showMessage({ type: 'SUCCESS', text: onSuccessMessage });
          } catch ({ response: { data: { message } = {} } = {} }) {
            setError(true);
            showMessage({
              type: 'ERROR',
              text: message || 'On-submit error. Server problem or operation could not be processed in real-time.',
            });
          }
        }}
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          invalid,
          values,
        }: {
          handleSubmit: () => void;
          submitting: boolean;
          invalid: boolean;
          values: Agent;
        }) => (
          <>
            <div className="flex items-center w-full px-6 py-4">
              <span tw="w-full text-20 leading-32 text-monochrome-black">
                {`${currentStepIndex + 1} of ${Children.count(children)}. ${name} `}
              </span>
              <div className="flex justify-end items-center w-full">
                {currentStepIndex > 0 && (
                  <Button
                    tw="flex gap-x-2 mr-4"
                    type="secondary"
                    size="large"
                    onClick={() => dispatch(previousStep())}
                    data-test="wizard:previous-button"
                  >
                    <Icons.Expander width={8} height={14} rotate={180} />
                    <span>Back</span>
                  </Button>
                )}
                {currentStepIndex < steps.length - 1 ? (
                  <Button
                    className="flex gap-x-2"
                    tw="w-28"
                    type="primary"
                    size="large"
                    onClick={() => dispatch(nextStep())}
                    disabled={submitting || invalid}
                    data-test="wizard:continue-button"
                  >
                    Continue
                    <Icons.Expander tw="text-monochrome-white" width={8} height={14} />
                  </Button>
                ) : (
                  <Button
                    tw="w-28"
                    className="flex gap-x-2"
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    data-test="wizard:finishng-button"
                    disabled={submitting || error}
                  >
                    {submitting ? <Spinner disabled /> : <Icons.Check height={10} width={14} viewBox="0 0 14 10" />}
                    <span>Finish</span>
                  </Button>
                )}
              </div>
            </div>
            <StepComponent formValues={values} />
          </>
        )}
      />
    </div>
  );
};
