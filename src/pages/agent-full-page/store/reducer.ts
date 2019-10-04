import { PluginState } from './store-types';

const SET_INITIAL_CONFIG = 'SET_INITIAL_CONFIG';
const SET_BUILD_VERSION = 'SET_BUILD_VERSION';

export type Action = ReturnType<typeof setBuildVersion | typeof setInitialConfig>;

export const setBuildVersion = (buildVersion: string) => {
  return { type: SET_BUILD_VERSION, payload: buildVersion } as const;
};

export const setInitialConfig = (config: {
  agentId: string;
  pluginId: string;
  buildVersion: string;
}) => {
  return { type: SET_INITIAL_CONFIG, payload: config } as const;
};

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case SET_INITIAL_CONFIG:
      return { ...state, ...action.payload };
    case SET_BUILD_VERSION:
      return { ...state, buildVersion: action.payload };
    default:
      return state;
  }
};
