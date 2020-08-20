import { TableActionsState } from './table-actions-types';

const SET_SEARCH_STATEMENT = 'SET_SEARCH_STATEMENT';
const SET_SORT_STATEMENT = 'SET_SORT_STATEMENT';

export type Action = ReturnType<typeof setSearchStatement | typeof setSortStatement>;

export const setSearchStatement = (value: string) => ({ type: SET_SEARCH_STATEMENT, payload: value } as const);

export const setSortStatement = (fieldName: string) => ({ type: SET_SORT_STATEMENT, payload: fieldName } as const);

export const actionsReducer = (state: TableActionsState, action: Action): TableActionsState => {
  switch (action.type) {
    case SET_SEARCH_STATEMENT:
      return { ...state, searchStatement: { ...state.searchStatement, value: action.payload } };
    case SET_SORT_STATEMENT:
      return { ...state, sortStatement: { fieldName: action.payload, order: state.sortStatement.order === 'ASC' ? 'DESC' : 'ASC' } };
    default:
      return state;
  }
};
