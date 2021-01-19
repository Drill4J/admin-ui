import { ReactNode, useReducer } from 'react';

import {
  CoveragePluginStateContext,
  CoveragePluginDispatchContext,
  defaultState,
} from './plugin-context';
import { pluginReducer } from './reducer';

interface Props {
  children: ReactNode;
}

export const CoveragePluginProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(pluginReducer, defaultState);

  return (
    <CoveragePluginStateContext.Provider value={state}>
      <CoveragePluginDispatchContext.Provider value={dispatch}>
        {children}
      </CoveragePluginDispatchContext.Provider>
    </CoveragePluginStateContext.Provider>
  );
};
