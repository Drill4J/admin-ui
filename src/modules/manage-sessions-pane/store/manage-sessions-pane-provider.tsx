import * as React from 'react';

import {
  ManageSessionsPaneContext,
  ManageSessionsPaneDispatchContext,
  defaultState,
} from './manage-sessions-pane-context';
import { sessionPaneReducer } from './reducer';
import { ManageSessionsPane } from '../manage-sessions-pane';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

export const ManageSessionsPaneProvider = ({ isOpen, onToggle }: Props) => {
  const [state, dispatch] = React.useReducer(sessionPaneReducer, defaultState);
  return (
    <ManageSessionsPaneContext.Provider value={state}>
      <ManageSessionsPaneDispatchContext.Provider value={dispatch}>
        <ManageSessionsPane isOpen={isOpen} onToggle={onToggle} />
      </ManageSessionsPaneDispatchContext.Provider>
    </ManageSessionsPaneContext.Provider>
  );
};
