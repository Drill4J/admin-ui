import { createContext, Dispatch, useContext } from 'react';

import { TableActionsState } from './table-actions-types';
import { Action } from './reducer';

export const defaultState: TableActionsState = {
  search: [],
  sort: [],
};

export const TableActionsStateContext = createContext<TableActionsState>(defaultState);

export const TableActionsDispatchContext = createContext<Dispatch<Action>>(() => {});

export function useTableActionsState(): TableActionsState {
  const context = useContext(TableActionsStateContext);
  if (!context) {
    throw new Error('useTableActionsState must be used within a TableActionsStateContext');
  }
  return context;
}

export function useTableActionsDispatch(): Dispatch<Action> {
  const context = useContext(TableActionsDispatchContext);
  if (!context) {
    throw new Error('useTableActionsDispatch must be used within a TableActionsDispatchContext');
  }
  return context;
}
