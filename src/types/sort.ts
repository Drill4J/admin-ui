export type Order = 'ASC' | 'DESC' | null;

export interface Sort {
  field: string;
  order: Order;
}
