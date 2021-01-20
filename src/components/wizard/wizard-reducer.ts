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
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';

interface State {
  currentStepIndex: number;
}

export const state = {
  currentStepIndex: 0,
};

export type Action = ReturnType<typeof nextStep | typeof previousStep>;

export const nextStep = () => ({ type: NEXT_STEP });

export const previousStep = () => ({ type: PREVIOUS_STEP });

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
