import { CoverageByType } from './coverage-by-type';

export interface Coverage {
  coverage?: number;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  methodsCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
  coverageByType?: CoverageByType;
}
