import { PluginState, ModalName } from './store-types';
import { ScopeSummary } from '../../../../types/scope-summary';

const SET_INITIAL_CONFIG = 'SET_INITIAL_CONFIG';
const SET_BUILD_VERSION = 'SET_BUILD_VERSION';
const OPEN_MODAL = 'OPEN_MODAL';

export type Action = ReturnType<
  typeof setBuildVersion | typeof openModal | typeof setInitialConfig
>;

export const setBuildVersion = (buildVersion: string) => {
  return { type: SET_BUILD_VERSION, payload: buildVersion } as const;
};

export const openModal = (modalName: ModalName | undefined, scope: ScopeSummary | null) => {
  return { type: OPEN_MODAL, payload: { openedModalName: modalName, scope } } as const;
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
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
