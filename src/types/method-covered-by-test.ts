import { MethodsDetails } from './methods-details';

export interface MethodCoveredByTest {
  id?: string;
  testName?: string;
  testType?: string;
  newMethods?: MethodsDetails[];
  modifiedMethods?: MethodsDetails[];
  unaffectedMethods?: MethodsDetails[];
}
