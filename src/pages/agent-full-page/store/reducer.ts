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
import { PluginState } from './store-types';
import { Agent } from '../../../types/agent';

const SET_INITIAL_CONFIG = 'SET_INITIAL_CONFIG';
const SET_BUILD_VERSION = 'SET_BUILD_VERSION';
const SET_LOADING = 'SET_LOADING';
const SET_AGENT = 'SET_AGENT';

export type Action = ReturnType<
  typeof setBuildVersion | typeof setInitialConfig | typeof setLoading | typeof setAgent
>;

export const setBuildVersion = (buildVersion: string) => ({ type: SET_BUILD_VERSION, payload: buildVersion } as const);

export const setLoading = (isLoading: boolean) => ({ type: SET_LOADING, payload: isLoading } as const);

export const setInitialConfig = (config: {
  agentId: string;
  pluginId: string;
  buildVersion: string;
}) => ({ type: SET_INITIAL_CONFIG, payload: config } as const);

export const setAgent = (agent: Agent) => ({ type: SET_AGENT, payload: agent } as const);

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case SET_INITIAL_CONFIG:
      return { ...state, ...action.payload };
    case SET_BUILD_VERSION:
      return { ...state, buildVersion: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_AGENT:
      return { ...state, agent: action.payload };
    default:
      return state;
  }
};
