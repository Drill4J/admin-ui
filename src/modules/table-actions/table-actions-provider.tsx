import * as React from 'react';

import {
  TableActionsStateContext,
  TableActionsDispatchContext,
  defaultState,
} from './table-actions-context';
import { actionsReducer } from './reducer';

interface Props {
  children: React.ReactNode;
}

export const TableActionsProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(actionsReducer, defaultState);

  return (
    <TableActionsStateContext.Provider value={state}>
      <TableActionsDispatchContext.Provider value={dispatch}>
        {children}
      </TableActionsDispatchContext.Provider>
    </TableActionsStateContext.Provider>
  );
};
