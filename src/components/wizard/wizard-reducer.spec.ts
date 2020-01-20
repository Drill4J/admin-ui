import {
  wizardReducer, NEXT_STEP, state, PREVIOUS_STEP,
} from './wizard-reducer';

describe('Wizard reducer actions', () => {
  it('should return the state changed to 1', () => {
    expect(wizardReducer(state, { type: NEXT_STEP })).toEqual({
      currentStepIndex: state.currentStepIndex + 1,
    });
  });

  it('should return the state changed to -1', () => {
    expect(wizardReducer(state, { type: PREVIOUS_STEP })).toEqual({
      currentStepIndex: state.currentStepIndex - 1,
    });
  });

  it('should return the initial state', () => {
    const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
    expect(wizardReducer(state, { type: UNKNOWN_ACTION })).toEqual({
      currentStepIndex: state.currentStepIndex,
    });
  });
});
