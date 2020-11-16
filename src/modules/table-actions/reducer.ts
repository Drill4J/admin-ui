import { Search } from 'types/search';
import { Sort } from 'types/sort';
import { TableActionsState } from './table-actions-types';

const SET_SEARCH = 'SET_SEARCH';
const SET_SORT = 'SET_SORT';

export type Action = ReturnType<typeof setSearch | typeof setSort>;

export const setSearch = (searchQuery: Search[]) => ({ type: SET_SEARCH, payload: searchQuery } as const);

export const setSort = (sort: Sort) => ({ type: SET_SORT, payload: sort } as const);

export const actionsReducer = (state: TableActionsState, action: Action): TableActionsState => {
  const [sort] = state.sort;
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case SET_SORT:
      return {
        ...state,
        sort: [{
          field: action.payload.field,
          order: action.payload.field === sort?.field ? action.payload.order : 'ASC',
        }].filter(({ order }) => Boolean(order)),
      };
    default:
      return state;
  }
};
