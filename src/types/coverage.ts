export interface Coverage {
  coverage?: number;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  methodsCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
}
