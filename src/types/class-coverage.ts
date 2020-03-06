import { MethodCoverage } from './method-coverage';

export interface ClassCoverage {
  id?: string;
  name?: string;
  path?: string;
  coverage?: number;
  totalMethodsCount?: number;
  coveredMethodsCount?: number;
  methods?: MethodCoverage[];
  [key: string]: unknown;
}
