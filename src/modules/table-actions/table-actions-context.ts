import React from 'react';

import { Order } from 'types/sort';
import { TableActionsState } from './table-actions-types';
import { Action } from './reducer';

export const defaultState = {
  search: { fieldName: 'name', value: '' },
  sort: { fieldName: 'name', order: 'ASC' as Order },
};

export const TableActionsStateContext = React.createContext<TableActionsState>(defaultState);

export const TableActionsDispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export function useTableActionsState(): TableActionsState {
  const context = React.useContext(TableActionsStateContext);
  if (!context) {
    throw new Error('useTableActionsState must be used within a TableActionsStateContext');
  }
  return context;
}

export function useTableActionsDispatch(): React.Dispatch<Action> {
  const context = React.useContext(TableActionsDispatchContext);
  if (!context) {
    throw new Error('useTableActionsDispatch must be used within a TableActionsDispatchContext');
  }
  return context;
}
