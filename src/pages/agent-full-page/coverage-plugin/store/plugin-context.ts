import React from 'react';

import { PluginState } from './store-types';
import { Action } from './reducer';

export const defaultState = {
  scope: null,
  openedModalName: undefined,
  activeSessions: {},
};

export const CoveragePluginStateContext = React.createContext<PluginState>(defaultState);

export const CoveragePluginDispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export function useCoveragePluginState() {
  const context = React.useContext(CoveragePluginStateContext);
  if (!context) {
    throw new Error('usePluginState must be used within a PluginStateContext');
  }
  return context;
}

export function useCoveragePluginDispatch() {
  const context = React.useContext(CoveragePluginDispatchContext);
  if (!context) {
    throw new Error('usePluginDispatch must be used within a PluginDispatchContext');
  }
  return context;
}
