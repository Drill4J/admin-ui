import { PluginState, ModalName } from './store-types';
import { ScopeSummary } from '../../../../types/scope-summary';

const OPEN_MODAL = 'OPEN_MODAL';

export type Action = ReturnType<typeof openModal>;

export const openModal = (modalName: ModalName | undefined, scope: ScopeSummary | null) => {
  return { type: OPEN_MODAL, payload: { openedModalName: modalName, scope } } as const;
};

export const pluginReducer = (state: PluginState, action: Action): PluginState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
