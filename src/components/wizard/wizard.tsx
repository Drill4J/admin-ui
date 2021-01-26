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
  Children, ComponentType, ReactElement, useReducer, useState, Component,
} from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form } from 'react-final-form';
import {
  Panel, Icons, Button, GeneralAlerts, Spinner,
} from '@drill4j/ui-kit';

import { Agent } from 'types/agent';

import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import {
  wizardReducer, previousStep, nextStep, state,
} from './wizard-reducer';
import { FormValidator } from '../../forms/form-validators';

import styles from './wizard.module.scss';

export interface StepProps {
  name: string;
  component: ComponentType<any>;
  validate?: FormValidator;
}

interface Props {
  className?: string;
  initialValues: Agent;
  onSubmit: (val: Record<string, unknown>, onError: (message: string) => void) => Promise<void>;
  children: ReactElement<StepProps>[];
}

const wizard = BEM(styles);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Step = (props: StepProps) => null;

export const Wizard = wizard(({
  className, children, initialValues, onSubmit,
}: Props) => {
  const [{ currentStepIndex }, dispatch] = useReducer(wizardReducer, state);
  const [errorMessage, setErrorMessage] = useState('');
  const steps = Children.toArray(children);
  const { name, validate, component: StepComponent } = (steps[currentStepIndex] as Component<StepProps>).props;
  const availablePlugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/plugins') || [];
  return (
    <div className={className}>
      <Form
        initialValues={{ ...initialValues, availablePlugins }}
        keepDirtyOnReinitialize
        onSubmit={async (values) => {
          try {
            await onSubmit(values, setErrorMessage);
          } catch ({ response: { data: { message } = {} } = {} }) {
            setErrorMessage(message || 'On-submit error. Server problem or operation could not be processed in real-time.');
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
            <Header>
              <StepName>
                {`${currentStepIndex + 1} of ${Children.count(children)}. ${name} `}
              </StepName>
              <Panel align="end">
                {currentStepIndex > 0 && (
                  <PreviousButton
                    type="secondary"
                    size="large"
                    onClick={() => dispatch(previousStep())}
                    data-test="wizard:previous-button"
                  >
                    <Icons.Expander width={8} height={14} rotate={180} />
                    <span>Back</span>
                  </PreviousButton>
                )}
                {currentStepIndex < steps.length - 1 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => dispatch(nextStep())}
                    disabled={submitting || invalid}
                    data-test="wizard:continue-button"
                  >
                    <span>Continue</span>
                    <Icons.Expander width={8} height={14} />
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    data-test="wizard:finishng-button"
                    disabled={submitting || Boolean(errorMessage)}
                  >
                    {submitting ? <WhiteSpinner /> : <Icons.Check height={10} width={14} viewBox="0 0 14 10" />}
                    <span>Finish registration</span>
                  </Button>
                )}
              </Panel>
            </Header>
            {errorMessage && (
              <GeneralAlerts type="ERROR">
                {errorMessage}
              </GeneralAlerts>
            )}
            <StepComponent formValues={values} />
          </>
        )}
      />
    </div>
  );
});

const Header = wizard.header(Panel);
const StepName = wizard.stepName('span');
const PreviousButton = wizard.previousButton(Button);
const WhiteSpinner = wizard.whiteSpinner(Spinner);
