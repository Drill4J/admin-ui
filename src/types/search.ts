type Operator = 'CONTAINS' | 'EQ';

export interface Search {
  field: string;
  value: string;
  op?: Operator;
}
