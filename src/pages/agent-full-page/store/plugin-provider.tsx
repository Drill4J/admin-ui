import * as React from 'react';

import { PluginStateContext, PluginDispatchContext, defaultState } from './plugin-context';
import { pluginReducer } from './reducer';

interface Props {
  children: React.ReactNode;
}

export const PluginProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(pluginReducer, defaultState);

  return (
    <PluginStateContext.Provider value={state}>
      <PluginDispatchContext.Provider value={dispatch}>{children}</PluginDispatchContext.Provider>
    </PluginStateContext.Provider>
  );
};
