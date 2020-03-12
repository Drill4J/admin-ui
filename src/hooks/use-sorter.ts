import { useEffect, useReducer } from 'react';

type Order = 'asc' | 'desc';

type SortState = { order: Order; fieldName: string; sortedData?: { [key: string]: unknown }[] };

type Action = ReturnType<typeof toggleOrder | typeof setSortedField | typeof setSortedData>;

const TOGGLE_ORDER = 'TOGGLE_ORDER';
const SET_SORTED_FIELD = 'SET_SORTED_FIELD';
const SET_SORTED_DATA = 'SET_SORTED_DATA';

const toggleOrder = () => ({ type: TOGGLE_ORDER } as const);
const setSortedField = (fieldName: string) => ({ type: SET_SORTED_FIELD, payload: fieldName } as const);
const setSortedData = (data: { [key: string]: unknown }[]) => ({ type: SET_SORTED_DATA, payload: data } as const);

const reducer = (state: SortState, action: Action): SortState => {
  switch (action.type) {
    case TOGGLE_ORDER:
      return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' };
    case SET_SORTED_FIELD:
      return { ...state, order: 'asc', fieldName: action.payload };
    case SET_SORTED_DATA:
      return { ...state, sortedData: action.payload };
    default:
      return state;
  }
};

export function useSorter<D extends {[key: string]: string | number }>(data: D[], fieldName: string) {
  const [{ fieldName: sortedFieldName, order, sortedData }, dispatch] = useReducer(reducer, { order: 'asc', fieldName, sortedData: [] });

  const handleToggleOrder = () => {
    dispatch(toggleOrder());
  };

  const handleSetSortedField = (field: string) => {
    dispatch(setSortedField(field));
  };

  const sortDescriptor = (firstObject: D, secondObject: D) =>
    (firstObject[sortedFieldName] > secondObject[sortedFieldName] ? 1 : -1);


  useEffect(
    () => {
      order === 'asc'
        ? dispatch(setSortedData(data.sort(sortDescriptor)))
        : dispatch(setSortedData(data.sort(sortDescriptor).reverse()));
    },
    // eslint-disable-next-line
    [data, sortedFieldName, order],
  );

  return {
    sortedData, order, fieldName: sortedFieldName, toggleOrder: handleToggleOrder, setSortedField: handleSetSortedField,
  };
}
