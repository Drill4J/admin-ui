import { createContext, Dispatch, useContext } from 'react';

import { PluginState } from './store-types';
import { Action } from './reducer';

export const defaultState = {
  agentId: '',
  pluginId: '',
  buildVersion: '',
  loading: false,
  agent: {},
};

export const PluginStateContext = createContext<PluginState>(defaultState);

export const PluginDispatchContext = createContext<Dispatch<Action>>(() => {});

export function usePluginState() {
  const context = useContext(PluginStateContext);
  if (!context) {
    throw new Error('usePluginState must be used within a PluginStateContext');
  }
  return context;
}

export function usePluginDispatch() {
  const context = useContext(PluginDispatchContext);
  if (!context) {
    throw new Error('usePluginDispatch must be used within a PluginDispatchContext');
  }
  return context;
}
