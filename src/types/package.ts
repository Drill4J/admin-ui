import { MethodCoverage } from './method-coverage';

export interface PackageClass {
  assocTestsCount?: number;
  coverage?: number;
  coveredMethodsCount?: number;
  id?: string;
  name?: string;
  path?: string;
  methods?: MethodCoverage[]
}

export interface Package {
  assocTestsCount?: number;
  coverage?: number;
  coveredMethodsCount?: number;
  id?: string;
  coveredClassesCount?: number;
  name?: string;
  totalClassesCount?: number;
  totalCount?: number;
  totalMethodsCount?: number;
  classes?: PackageClass[];
}
