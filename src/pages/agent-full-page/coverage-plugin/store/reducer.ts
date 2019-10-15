import { PluginState, ModalName } from './store-types';
import { ScopeSummary } from '../../../../types/scope-summary';
import { ActiveSessions } from '../../../../types/active-sessions';

const OPEN_MODAL = 'OPEN_MODAL';
const SET_ACTIVE_SESSION = 'SET_ACTIVE_SESSION';

export type Action = ReturnType<typeof openModal | typeof setActiveSession>;

export const openModal = (modalName: ModalName | undefined, scope: ScopeSummary | null) => {
  return { type: OPEN_MODAL, payload: { openedModalName: modalName, scope } } as const;
};

export const setActiveSession = (activeSessions: ActiveSessions) => {
  return { type: SET_ACTIVE_SESSION, payload: activeSessions } as const;
};

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ACTIVE_SESSION:
      return {
        ...state,
        activeSessions: action.payload,
      };
    default:
      return state;
  }
};
