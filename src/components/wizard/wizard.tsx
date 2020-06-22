import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form } from 'react-final-form';

import { Panel } from 'layouts';
import { Button } from 'forms';
import { Icons } from 'components';
import { Agent } from 'types/agent';
import {
  wizardReducer, previousStep, nextStep, state,
} from './wizard-reducer';

import styles from './wizard.module.scss';

export interface StepProps {
  name: string;
  component: React.ComponentType<any>;
  validate?: (fields: any) => { [fieldName: string]: string | string[] } | undefined;
}

interface Props {
  className?: string;
  initialValues: Agent;
  onSubmit: (val: any, onError: (message: string) => void) => any;
  children: React.ReactElement<StepProps>[];
}

const wizard = BEM(styles);

export const Step = (props: StepProps) => null;

export const Wizard = wizard(({
  className, children, initialValues, onSubmit,
}: Props) => {
  const [{ currentStepIndex }, dispatch] = React.useReducer(wizardReducer, state);
  const [errorMessage, setErrorMessage] = React.useState('');
  const steps = React.Children.toArray(children);
  const { name, validate, component: StepComponent } = (steps[currentStepIndex] as React.Component<StepProps>).props;

  return (
    <div className={className}>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values, setErrorMessage)}
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
          values: {};
        }) => (
          <>
            <Header>
              <StepName>
                {`${currentStepIndex + 1} of ${React.Children.count(children)}. ${name} `}
              </StepName>
              <Panel align="end">
                {currentStepIndex > 0 && (
                  <PreviousButton
                    type="secondary"
                    size="large"
                    onClick={() => dispatch(previousStep())}
                    data-test="wizard:previous-button"
                  >
                    <Icons.Arrow rotate={180} />
                    <span>Back</span>
                  </PreviousButton>
                )}
                {currentStepIndex < steps.length - 1 ? (
                  <ContinueButton
                    type="primary"
                    size="large"
                    onClick={() => dispatch(nextStep())}
                    disabled={submitting || invalid}
                    data-test="wizard:continue-button"
                  >
                    <span>Continue</span>
                    <Icons.Arrow />
                  </ContinueButton>
                ) : (
                  <FinishRegistrationButton
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    data-test="wizard:finish-registration-button"
                  >
                    <Icons.Check height={11} width={17} />
                    <span>Finish registration</span>
                  </FinishRegistrationButton>
                )}
              </Panel>
            </Header>
            {errorMessage && (
              <ErrorMessage>
                <ErrorMessageIcon />
                {errorMessage}
              </ErrorMessage>
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
const ContinueButton = wizard.continueButton(Button);
const FinishRegistrationButton = wizard.finishRegistrationButton(Button);
const ErrorMessage = wizard.errorMessage(Panel);
const ErrorMessageIcon = wizard.errorMessageIcon(Icons.Warning);
