import React from 'react';

import { PluginState, Action } from './store-types';

interface Context {
  state: PluginState;
  dispatch: React.Dispatch<Action>;
}

export const defaultState = {
  state: {
    agentId: '',
    pluginId: '',
    buildVersion: '',
    scope: null,
    openedModalName: undefined,
  },
  dispatch: () => {},
};

export const PluginContext = React.createContext<Context>(defaultState);
