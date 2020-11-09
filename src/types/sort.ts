export type Order = 'ASC' | 'DESC';

export interface Sort {
  fieldName: string;
  order: Order;
}
