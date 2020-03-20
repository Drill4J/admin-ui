import { CoverageByType } from './coverage-by-type';

export interface BuildCoverage {
  ratio?: number;
  methodCount?: number;
  riskCount?: number;
  byTestType?: CoverageByType;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
  diff?: number;
  prevBuildVersion?: string;
  finishedScopesCount?: number;
}
