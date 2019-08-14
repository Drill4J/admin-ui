import { PluginState, Action } from './store-types';
import { ScopeSummary } from '../../../../types/scope-summary';

const SET_INITIAL_CONFIG = 'SET_INITIAL_CONFIG';
const SET_BUILD_VERSION = 'SET_BUILD_VERSION';
const OPEN_MODAL = 'OPEN_MODAL';

export const setBuildVersion = (buildVersion: string) => {
  return { type: SET_BUILD_VERSION, payload: buildVersion };
};

export const openModal = (modalName: string, scope: ScopeSummary | null | void) => {
  return { type: OPEN_MODAL, payload: { openedModalName: modalName, scope } };
};

export const setInitialConfig = (config: {
  agentId: string;
  pluginId: string;
  buildVersion: string;
}) => {
  return { type: SET_INITIAL_CONFIG, payload: config };
};

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case SET_INITIAL_CONFIG:
      return { ...state, ...(action.payload as PluginState) };
    case SET_BUILD_VERSION:
      return { ...state, buildVersion: String(action.payload) };
    case OPEN_MODAL:
      return {
        ...state,
        ...(action.payload as PluginState),
      };

    default:
      return state;
  }
};
