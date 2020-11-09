import { Search } from 'types/search';
import { TableActionsState } from './table-actions-types';

const SET_SEARCH = 'SET_SEARCH';
const TOGGLE_ORDER = 'TOGGLE_ORDER';

export type Action = ReturnType<typeof setSearch | typeof toggleOrder>;

export const setSearch = (searchQuery: Search[]) => ({ type: SET_SEARCH, payload: searchQuery } as const);

export const toggleOrder = (fieldName: string) => ({ type: TOGGLE_ORDER, payload: fieldName } as const);

export const actionsReducer = (state: TableActionsState, action: Action): TableActionsState => {
  const [order] = state.sort;
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case TOGGLE_ORDER:
      return {
        ...state,
        sort: [{
          field: action.payload,
          order: order.field === action.payload ? invertOrder(order.order) : 'ASC',
        }],
      };
    default:
      return state;
  }
};

function invertOrder(order: 'ASC' | 'DESC') {
  return order === 'ASC' ? 'DESC' : 'ASC';
}
