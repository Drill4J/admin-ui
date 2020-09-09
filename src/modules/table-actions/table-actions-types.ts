export type Order = 'ASC' | 'DESC';

export interface Search {
  fieldName: string;
  value: string;
}

export interface Sort {
  fieldName: string;
  order: Order;
}

export interface TableActionsState {
  search: Search;
  sort: Sort;
}
