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

import { PluginState } from './store-types';
import { Action } from './reducer';

export const defaultState = {
  scopeId: undefined,
  openedModalName: undefined,
  activeSessions: {},
};

export const CoveragePluginStateContext = createContext<PluginState>(defaultState);

export const CoveragePluginDispatchContext = createContext<Dispatch<Action>>(() => {});

export function useCoveragePluginState() {
  const context = useContext(CoveragePluginStateContext);
  if (!context) {
    throw new Error('usePluginState must be used within a PluginStateContext');
  }
  return context;
}

export function useCoveragePluginDispatch() {
  const context = useContext(CoveragePluginDispatchContext);
  if (!context) {
    throw new Error('usePluginDispatch must be used within a PluginDispatchContext');
  }
  return context;
}
