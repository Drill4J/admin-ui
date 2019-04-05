import { MethodCoverage } from './method-coverage';

export interface ClassCoverage {
  name?: string;
  path?: string;
  coverage?: number;
  totalMethodsCount?: number;
  coveredMethodsCount?: number;
  methods?: MethodCoverage[];
}
