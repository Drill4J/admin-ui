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
import { ActiveSessions } from 'types/active-sessions';
import { PluginState, ModalName } from './store-types';

const OPEN_MODAL = 'OPEN_MODAL';
const SET_ACTIVE_SESSIONS = 'SET_ACTIVE_SESSIONS';

export type Action = ReturnType<typeof openModal | typeof setActiveSessions>;

export const openModal = (modalName?: ModalName, scopeId?: string) =>
  ({ type: OPEN_MODAL, payload: { openedModalName: modalName, scopeId } } as const);

export const setActiveSessions = (activeSessions: ActiveSessions) => ({ type: SET_ACTIVE_SESSIONS, payload: activeSessions } as const);

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ACTIVE_SESSIONS:
      return {
        ...state,
        activeSessions: action.payload,
      };
    default:
      return state;
  }
};
