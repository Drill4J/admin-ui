import { TableActionsState } from './table-actions-types';

const SET_SEARCH = 'SET_SEARCH';
const TOGGLE_ORDER = 'TOGGLE_ORDER';

export type Action = ReturnType<typeof setSearch | typeof toggleOrder>;

export const setSearch = (value: string) => ({ type: SET_SEARCH, payload: value } as const);

export const toggleOrder = (fieldName: string) => ({ type: TOGGLE_ORDER, payload: fieldName } as const);

export const actionsReducer = (state: TableActionsState, action: Action): TableActionsState => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: { ...state.search, value: action.payload } };
    case TOGGLE_ORDER:
      return {
        ...state,
        sort: {
          fieldName: action.payload,
          order: state.sort.fieldName === action.payload ? invertOrder(state.sort.order) : 'ASC',
        },
      };
    default:
      return state;
  }
};

function invertOrder(order: 'ASC' | 'DESC') {
  return order === 'ASC' ? 'DESC' : 'ASC';
}
