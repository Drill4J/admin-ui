import React from 'react';

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

export const SessionsManagementPaneContext = React.createContext<SessionsPaneState>(defaultState);

export const SessionsManagementPaneDispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export function useSessionsPaneState(): SessionsPaneState {
  const context = React.useContext(SessionsManagementPaneContext);
  if (!context) {
    throw new Error('useSessionsPaneState must be used within a SessionsManagementPaneContext');
  }
  return context;
}

export function useSessionsPaneDispatch(): React.Dispatch<Action> {
  const context = React.useContext(SessionsManagementPaneDispatchContext);
  if (!context) {
    throw new Error('useSessionsPaneDispatch must be used within a SessionsManagementPaneDispatchContext');
  }
  return context;
}
