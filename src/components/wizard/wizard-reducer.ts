export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';

interface State {
  currentStepIndex: number;
}

export const state = {
  currentStepIndex: 0,
};

export type Action = ReturnType<typeof nextStep | typeof previousStep>;

export const nextStep = () => {
  return { type: NEXT_STEP };
};

export const previousStep = () => {
  return { type: PREVIOUS_STEP };
};

export const wizardReducer = ({ currentStepIndex }: State, action: Action) => {
  switch (action.type) {
    case NEXT_STEP:
      return {
        currentStepIndex: currentStepIndex + 1,
      };
    case PREVIOUS_STEP:
      return { currentStepIndex: currentStepIndex - 1 };
    default:
      return state;
  }
};
