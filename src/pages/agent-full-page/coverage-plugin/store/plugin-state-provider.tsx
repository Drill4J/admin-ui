import * as React from 'react';

import { PluginContext, defaultState } from './plugin-context';
import { pluginReducer } from './reducer';

interface Props {
  children: React.ReactNode;
}

export const PluginStateProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(pluginReducer, defaultState.state);

  const context = { state, dispatch };

  return <PluginContext.Provider value={context}>{children}</PluginContext.Provider>;
};
