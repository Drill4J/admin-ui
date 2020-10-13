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

export const ManageSessionsPaneContext = React.createContext<SessionsPaneState>(defaultState);

export const ManageSessionsPaneDispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export function useSessionsPaneState(): SessionsPaneState {
  const context = React.useContext(ManageSessionsPaneContext);
  if (!context) {
    throw new Error('useSessionsPaneState must be used within a ManageSessionsPaneContext');
  }
  return context;
}

export function useSessionsPaneDispatch(): React.Dispatch<Action> {
  const context = React.useContext(ManageSessionsPaneDispatchContext);
  if (!context) {
    throw new Error('useSessionsPaneDispatch must be used within a ManageSessionsPaneDispatchContext');
  }
  return context;
}
