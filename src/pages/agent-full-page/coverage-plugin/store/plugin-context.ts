import { createContext, Dispatch, useContext } from 'react';

import { PluginState } from './store-types';
import { Action } from './reducer';

export const defaultState = {
  scope: null,
  openedModalName: undefined,
  activeSessions: {},
};

export const CoveragePluginStateContext = createContext<PluginState>(defaultState);

export const CoveragePluginDispatchContext = createContext<Dispatch<Action>>(() => {});

export function useCoveragePluginState() {
  const context = useContext(CoveragePluginStateContext);
  if (!context) {
    throw new Error('usePluginState must be used within a PluginStateContext');
  }
  return context;
}

export function useCoveragePluginDispatch() {
  const context = useContext(CoveragePluginDispatchContext);
  if (!context) {
    throw new Error('usePluginDispatch must be used within a PluginDispatchContext');
  }
  return context;
}
