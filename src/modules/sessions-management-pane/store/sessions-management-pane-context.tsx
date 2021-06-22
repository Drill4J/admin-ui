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
import { createContext, Dispatch, useContext } from 'react';

import { Action, SessionsPaneState } from './reducer';

export const defaultState: SessionsPaneState = {
  isNewSession: false,
  bulkOperation: {
    isProcessing: false,
    operationType: 'abort',
  },
};

export const SessionsManagementPaneContext = createContext<SessionsPaneState>(defaultState);

export const SessionsManagementPaneDispatchContext = createContext<Dispatch<Action>>(() => {});

export function useSessionsPaneState(): SessionsPaneState {
  const context = useContext(SessionsManagementPaneContext);
  if (!context) {
    throw new Error('useSessionsPaneState must be used within a SessionsManagementPaneContext');
  }
  return context;
}

export function useSessionsPaneDispatch(): Dispatch<Action> {
  const context = useContext(SessionsManagementPaneDispatchContext);
  if (!context) {
    throw new Error('useSessionsPaneDispatch must be used within a SessionsManagementPaneDispatchContext');
  }
  return context;
}
