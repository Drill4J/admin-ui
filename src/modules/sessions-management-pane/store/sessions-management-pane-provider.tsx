import { useReducer } from 'react';

import {
  SessionsManagementPaneContext,
  SessionsManagementPaneDispatchContext,
  defaultState,
} from './sessions-management-pane-context';
import { sessionPaneReducer } from './reducer';
import { SessionsManagementPane } from '../sessions-management-pane';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

export const SessionsManagementPaneProvider = ({ isOpen, onToggle }: Props) => {
  const [state, dispatch] = useReducer(sessionPaneReducer, defaultState);
  return (
    <SessionsManagementPaneContext.Provider value={state}>
      <SessionsManagementPaneDispatchContext.Provider value={dispatch}>
        <SessionsManagementPane isOpen={isOpen} onToggle={onToggle} />
      </SessionsManagementPaneDispatchContext.Provider>
    </SessionsManagementPaneContext.Provider>
  );
};
