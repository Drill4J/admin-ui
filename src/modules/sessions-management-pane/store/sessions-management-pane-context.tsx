import { createContext, Dispatch, useContext } from 'react';

import { Action, SessionsPaneState } from './reducer';

export const defaultState: SessionsPaneState = {
  isNewSession: false,
  singleOperation: {
    id: '',
    operationType: 'abort',
  },
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
