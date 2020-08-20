export type Order = 'ASC' | 'DESC';

export interface SearchStatement {
  fieldName: string;
  value: string;
}

export interface SortStatement {
  fieldName: string;
  order: Order;
}

export interface TableActionsState {
  searchStatement: SearchStatement;
  sortStatement: SortStatement;
}
