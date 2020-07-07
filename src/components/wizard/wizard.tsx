import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form } from 'react-final-form';
import {
  Panel, Icons, Button, GeneralAlerts,
} from '@drill4j/ui-kit';

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
                    data-test="wizard:finish-registration-button"
                  >
                    <Icons.Check height={10} width={14} viewBox="0 0 14 10" />
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
