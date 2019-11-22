import { CoverageByType } from './coverage-by-type';

export interface Coverage {
  coverage?: number;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  methodsCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
  coverageByType?: CoverageByType;
  diff?: number;
  previousBuildInfo?: { first: string; second: string };
  finishedScopesCount?: number;
}
