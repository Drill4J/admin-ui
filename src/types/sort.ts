export type Order = 'ASC' | 'DESC';

export interface Sort {
  field: string;
  order: Order;
}
