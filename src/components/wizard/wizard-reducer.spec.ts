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
import { wizardReducer, NEXT_STEP, state, PREVIOUS_STEP } from './wizard-reducer';

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
