import { ReactNode, useReducer } from 'react';

import {
  TableActionsStateContext,
  TableActionsDispatchContext,
  defaultState,
} from './table-actions-context';
import { actionsReducer } from './reducer';

interface Props {
  children: ReactNode;
}

export const TableActionsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(actionsReducer, defaultState);

  return (
    <TableActionsStateContext.Provider value={state}>
      <TableActionsDispatchContext.Provider value={dispatch}>
        {children}
      </TableActionsDispatchContext.Provider>
    </TableActionsStateContext.Provider>
  );
};
