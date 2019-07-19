import { TestTypeSummary } from './test-type-summary';

export interface Coverage {
  coverage?: number;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  methodsCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
}
